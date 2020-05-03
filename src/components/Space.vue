<template>
  <div
    :id="id"
    :class="thisClass"
    @click="spaceClick($event)"
  >
    <img :src="pieceIconUrl" />
  </div>
</template>

<script>
const rules = require('../js/rules.js')
export default {
  name: 'space',
  props: {
    piece: String,
    id: String,
    color: String
  },
  created () {},
  data () {
    return {}
  },
  computed: {
    thisClass () {
      const select = this.isSelected ? 'space selected' : 'space'
      return this.color + ' ' + select
    },
    pieceIconUrl () {
      const c = this.pieceColor === 'white' ? '-w' : '-b'
      const icon = this.piece === 'empty' ? 'empty' : this.type + c
      return require('../assets/pieces/' + icon + '.png')
    },
    type () {
      if (this.piece === 'empty') { return 'empty' }
      return /\d/.test(this.piece) ? this.piece.substring(0, this.piece.length - 3) : this.piece.substring(0, this.piece.length - 2)
    },
    turn () {
      return this.$store.state.turn ? 'white' : 'black'
    },
    isSelected () {
      return this.$store.state.selected === this.id
    },
    pieceColor () {
      if (this.piece === 'empty') { return 'empty' }
      const color = /\d/.test(this.piece) ? this.piece.substring(this.piece.length - 2, this.piece.length - 1) : this.piece.substring(this.piece.length - 1)
      return color === 'w' ? 'white' : 'black'
    }
  },
  methods: {
    spaceClick (e) {
      console.log('piece Color ' + this.pieceColor)
      console.log('piece type ' + this.type)
      if (this.turn === this.pieceColor && this.type !== 'empty') {
        // if this piece is selected, unselected it
        if (this.isSelected) {
          this.$store.commit('select', { piece: null })
        } else {
          this.$store.commit('select', { piece: this.id })
        }
      }
      if (this.turn !== this.pieceColor && this.isSelected != null) {
        console.log('move here')
        // handle space selected to move
        console.log(rules.canPieceMove(this.id))
        this.$store.commit('move', { to: this.id })
      }
    }
  }
}
</script>

<style>
.space {
  width: 12.5%;
  max-height: 60px;
}
.black {
  background-color: rgb(35, 75, 65)
}
.selected {
  box-shadow: 2px 2px 5px rgb(54, 247, 96) inset,
    -2px -2px 5px rgb(54, 247, 96) inset
}
</style>

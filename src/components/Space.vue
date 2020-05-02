<template>
  <div
    :class="selected ? 'space selected' : 'space'"
    @click="spaceClick"
  >
    <img :src="pieceIconUrl" />
  </div>
</template>

<script>
export default {
  name: 'space',
  props: {
    piece: String
  },
  data () {
    return {}
  },
  computed: {
    pieceIconUrl () {
      const c = this.color === 'white' ? '-w' : '-b'
      const icon = this.piece === 'empty' ? 'empty' : this.type + c
      return require('../assets/pieces/' + icon + '.png')
    },
    type () {
      if (this.piece === 'empty') { return }
      return /\d/.test(this.piece) ? this.piece.substring(0, this.piece.length - 3) : this.piece.substring(0, this.piece.length - 2)
    },
    turn () {
      return this.$store.state.turn
    },
    selected () {
      return this.$store.state.selected === this.piece
    },
    color () {
      const color = /\d/.test(this.piece) ? this.piece.substring(this.piece.length - 2, this.piece.length - 1) : this.piece.substring(this.piece.length - 1)
      return color === 'w' ? 'white' : 'black'
    }
  },
  methods: {
    spaceClick () {
      if (this.turn === this.color && this.type !== 'empty') {
        // if this piece is selected, unselected it
        if (this.selected) {
          this.$store.commit('select', { piece: null })
        } else {
          this.$store.commit('select', { piece: this.piece })
        }
      }
      if (this.turn === this.color && this.type === 'empty' && this.selected != null) {
        // handle space selected to move
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

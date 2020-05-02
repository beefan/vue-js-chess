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
    return {
      selected: false
    }
  },
  computed: {
    pieceIconUrl () {
      return require('../assets/pieces/' + this.piece + '.png')
    }
  },
  methods: {
    spaceClick () {
      this.selected = !this.selected
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

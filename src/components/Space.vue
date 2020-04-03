<template>
  <div class="space">
      <img :src="pieceIconUrl" />
  </div>
</template>

<script>
export default {
  name: 'space',
  props: {
    piece: String
  },
  computed: {
    pieceIconUrl () {
      return require('../assets/pieces/' + this.piece + '.png')
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
    background-color: rgb(35, 75, 65);
}
</style>

<template>
  <div class="board">
    <div class="board-head">
      <p></p>
      <button @click="resetBoard"> Reset Game </button>
    </div>
    <div class="board-body">
      <div class="row" v-for="row in rows" v-bind:key="row">
        <space
          v-for="space in getRow(row)"
          v-bind:key="space.id"
          :id="space.id"
          :color="space.color"
          :piece="space.occupant"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Space from '../components/Space.vue'

export default {
  name: 'board',
  components: {
    Space
  },
  data () {
    return {
      rows: [0, 1, 2, 3, 4, 5, 6, 7]
    }
  },
  created () {},
  computed: {
    board () {
      return this.$store.state.board
    }
  },
  methods: {
    getRow (num) {
      const numMap = [8, 7, 6, 5, 4, 3, 2, 1]
      num = numMap[num]
      return this.board.filter(space => space.id.includes(num))
    },
    resetBoard () {
      console.log('refresh called to')
      this.$store.commit('refresh')
    }
  }
}
</script>

<style>
.row {
  display: flex;
}
.board-body {
  display: flex;
  flex-flow: column;
  border: 2px solid black;
  max-width: 480px;
  margin: auto;
}
.board-head {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.board-head button {
  background-color: #ddd;
  padding: 10px;
  border: none;
}
.board-head button:hover {
  background-color: #fff;
  box-shadow: 2px 2px 5px #ddd, -2px -2px 6px #eee;
}
</style>

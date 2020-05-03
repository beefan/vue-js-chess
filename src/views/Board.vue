<template>
  <div class="board">
    <div class="board-head">
      <p></p>
      <a href="/"><button> Reset Game </button></a>
    </div>
    <div class="board-body">
      <div class="row" v-for="row in rows" v-bind:key="row">
        <div class="row-label">{{ 8 - row }}</div>
        <space
          v-for="space in getRow(row)"
          v-bind:key="space.id"
          :id="space.id"
          :color="space.color"
          :piece="space.occupant"
        />
      </div>
      <div class="row">
        <div class="col-label">A</div>
        <div class="col-label">B</div>
        <div class="col-label">C</div>
        <div class="col-label">D</div>
        <div class="col-label">E</div>
        <div class="col-label">F</div>
        <div class="col-label">G</div>
        <div class="col-label">H</div>
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
      rowNumber: 0,
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
    }
  }
}
</script>

<style>
.row {
  display: flex;
}
.row-label {
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  padding: 2px;
  font-weight: bold;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.col-label {
  width: 12%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-weight: bold;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.board-body {
  display: flex;
  flex-flow: column;
  border: 2px solid black;
  max-width: 518px;
  padding-top: 5px;
  margin-left: auto;
  margin-right: auto;
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

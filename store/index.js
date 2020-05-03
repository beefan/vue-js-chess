import Vue from 'vue'
import Vuex from 'vuex'
import boardSetup from '../src/assets/board-setup.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //  variables here to maintain state of
    board: boardSetup,
    turn: 'white',
    selected: null,
    move: null
  },
  getters: {
    //  vuex supports getter properties for various elements of state
    getBoard: state => {
      return state.board
    },
    getSelected: state => {
      return state.selected
    },
    getTurn: state => {
      return state.turn
    }
  },
  mutations: {
    //  only way to change state in vuex is with mutations
    //  store.commit('increment') to call this in other components
    //  can pass another arg such as   increment (state, n) {
    //  https://vuex.vuejs.org/guide/mutations.html
    //  increment (state) {
    //   state.count++
    // },
    select (state, payload) {
      state.selected = payload.piece
    },
    refresh (state) {
      state.turn = 'white'
      state.selected = null
      state.move = null
      state.board = boardSetup
    }
  },
  actions: {
    //  like mutations but async allowed
    //  used for api calls
    //  this.$store.dispatch('xxx') in child components
  }
})

export default store

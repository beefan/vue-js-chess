import Vue from 'vue'
import Vuex from 'vuex'
import theBoard from '../src/assets/board-setup.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //  variables here to maintain state of
    board: theBoard,
    turn: true,
    selected: null
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
    move (state, payload) {
      movePiece(payload.to, state)
    }
  },
  actions: {
    //  like mutations but async allowed
    //  used for api calls
    //  this.$store.dispatch('xxx') in child components
  }
})

function movePiece (to, state) {
  let piece
  if (!state.selected) {
    return
  }
  for (const space of state.board) {
    if (space.id === state.selected) {
      piece = space.occupant
      space.occupant = 'empty'
      break
    }
  }
  for (const space of state.board) {
    if (space.id === to) {
      space.occupant = piece
      break
    }
  }

  state.turn = !state.turn
  state.selected = null
  console.log('moving ' + piece + ' to ' + to + ' from ' + state.selected)
}

export default store

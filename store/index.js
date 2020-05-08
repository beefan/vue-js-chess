import Vue from 'vue'
import Vuex from 'vuex'
import theBoard from '../src/assets/board-setup.json'

Vue.use(Vuex)

const rules = require('../src/js/rules.js')
const store = new Vuex.Store({
  state: {
    //  variables here to maintain state of
    board: theBoard,
    turn: true,
    selected: null,
    validMoves: [],
    check: false
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
    },
    getMoves: state => {
      return state.validMoves
    },
    getCheck: state => {
      return state.check
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
      if (payload.piece !== null) {
        state.validMoves = rules.getMoves()
      } else {
        state.validMoves = []
      }
    },
    move (state, payload) {
      const players = proposeMove(payload.to, state)
      if (rules.inCheck()) {
        alert('moving there will put you in check')
        rollbackMove(state, payload.to, players)
      } else {
        commitMove(state)
        const status = putOpponentInCheck(state)
        if (status === 'check') {
          alert('Check')
        } else if (status === 'checkmate') {
          const winner = state.turn ? 'black!' : 'white!'
          alert('Checkmate. The winner is ' + winner)
        }
      }
    }
  },
  actions: {
    //  like mutations but async allowed
    //  used for api calls
    //  this.$store.dispatch('xxx') in child components
  }
})
function putOpponentInCheck (state) {
  let status = ''
  state.turn = !state.turn
  const value = rules.inCheck()
  state.turn = !state.turn
  if (value) {
    status = isCheckMate(state) ? 'checkmate' : 'check'
  }
  return status
}
function isCheckMate (state) {
  console.log('checking to see if ' + state.turn + ' is in checkmate ')

  const pieces = rules.getPieces()

  let canMove = false
  for (const piece of pieces) {
    // select the piece
    store.commit('select', { piece: piece.id })
    for (const move of state.validMoves) {
      const players = proposeMove(move, state)
      if (!rules.inCheck()) {
        canMove = true
      }
      rollbackMove(state, move, players)
      if (canMove) {
        break
      }
    }
    if (canMove) {
      break
    }
  }
  commitMove(state)
  return !canMove
}
function proposeMove (to, state) {
  const target = state.board.filter(x => x.id === to)[0].occupant
  const selected = state.board.filter(x => x.id === state.selected)[0].occupant

  for (const space of state.board) {
    if (space.id === state.selected) {
      space.occupant = 'empty'
    }
    if (space.id === to) {
      space.occupant = selected
    }
  }
  console.log(selected + ' from ' + state.selected + ' to ' + to)
  state.turn = !state.turn
  return { selected: selected, target: target }
}
function commitMove (state) {
  state.validMoves = []
  state.selected = null
}
function rollbackMove (state, to, players) {
  for (const space of state.board) {
    if (space.id === state.selected) {
      space.occupant = players.selected
    }
    if (space.id === to) {
      space.occupant = players.target
    }
  }
  state.turn = !state.turn
}
// function movePiece (to, state) {
//   let piece
//   if (!state.selected) {
//     return
//   }
//   for (const space of state.board) {
//     if (space.id === state.selected) {
//       piece = space.occupant
//       space.occupant = 'empty'
//       break
//     }
//   }
//   for (const space of state.board) {
//     if (space.id === to) {
//       space.occupant = piece
//       break
//     }
//   }

//   state.turn = !state.turn
//   state.selected = null
// }

export default store

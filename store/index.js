import Vue from 'vue'
import Vuex from 'vuex'
import theBoard from '../src/assets/board-setup.json'

Vue.use(Vuex)

const rules = require('../src/js/rules.js')
const store = new Vuex.Store({
  state: {
    board: theBoard,
    turn: true,
    selected: null,
    validMoves: [],
    check: false
  },
  getters: {
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
        logMove(players.selected, state.selected, payload.to)
        commitMove(state, payload.to)
        const status = putOpponentInCheck(state)
        if (status === 'check') {
          alert('Check')
        } else if (status === 'checkmate') {
          const winner = state.turn ? 'black!' : 'white!'
          alert('Checkmate. The winner is ' + winner)
        }
      }
    }
  }
})
/**
 * Move piece but return copies
 * for reverting later if needed
 *
 * @param {String} to id of space to move to
 * @param {Object} state vuex state
 */
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
  state.turn = !state.turn
  return { selected: selected, target: target }
}
/**
 * Commit the move, updating state, and writing to log
 *
 * @param {Object} state vuex state
 * @param {String} to id of space to move to
 */
function commitMove (state) {
  state.validMoves = []
  state.selected = null
}
/**
 * Rollback a move if the move can't be done.
 *
 * @param {Object} state vuex state
 * @param {String} to id of space to rollback
 * @param {Object} players obj containing copies of space occupants before the move
 */
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
/**
 * Returns true if the opponent is in check
 * false if not
 *
 * @param {Object} state vuex state
 */
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
/**
 * Returns true if the opponent is in checkmate
 * false if not
 *
 * @param {Object} state vuex state
 */
function isCheckMate (state) {
  const pieces = rules.getPieces()
  let canMove = false
  for (const piece of pieces) {
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
/**
 * Write the move to the console to keep a log of all moves
 *
 * @param {String} selected piece selected to move
 * @param {String} from id from which to move
 * @param {String} to id to which to move
 */
function logMove (selected, from, to) {
  console.log('MOVE: ' + selected + ' from ' + from + ' to ' + to)
}

export default store

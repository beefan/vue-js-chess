import store from '../../store/index.js'
const moves = require('./moves.js')

export function getMoves () {
  return moves.getValidMoves(getPieceType(), store.state)
}

function getPieceType () {
  for (const space of store.state.board) {
    if (space.id === store.state.selected) {
      return space.occupant.split('-')[0]
    }
  }
}

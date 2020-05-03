import store from '../../store/index.js'
const moves = require('./moves.js')

export function canPieceMove (to) {
  return moves.canMove(getPieceType(), to, store.state)
}

function getPieceType () {
  for (const space of store.state.board) {
    if (space.id === store.state.selected) {
      return space.occupant.split('-')[0]
    }
  }
}

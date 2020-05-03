import store from '../../store/index.js'
const moves = require('./moves.js')

export function canPieceMove (to) {
  switch (getPieceType()) {
    case 'pawn':
      return moves.canPawnMove(to, store.state)
    case 'rook':
      return moves.canRookMove(to, store.state)
    case 'knight':
      return moves.canKnightMove(to, store.state)
    case 'bishop':
      return moves.canBishopMove(to, store.state)
    case 'queen':
      return moves.canQueenMove(to, store.state)
    case 'king':
      return moves.canKingMove(to, store.state)
    default:
      return false
  }
}

function getPieceType () {
  for (const space of store.state.board) {
    if (space.id === store.state.selected) {
      return space.occupant.split('-')[0]
    }
  }
}

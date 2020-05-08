import store from '../../store/index.js'
const moves = require('./moves.js')

/**
 * returns valid moves for selected piece
 */
export function getMoves () {
  return moves.getValidMoves(getPieceType(), store.state, store.state.selected)
}
/**
 * returns array of spaces containing pieces of color turnColor()
 */
export function getPieces () {
  return store.state.board.filter(x => getColor(x) === turnColor())
}
/**
 * returns true if opponent in check
 */
export function inCheck () {
  const thisKing = !store.state.turn ? 'king-w' : 'king-b'
  const thisKingLoc = store.state.board.filter(x => x.occupant === thisKing)[0]
    .id
  const opponentPieces = store.state.board.filter(
    x => getColor(x) === turnColor()
  )

  let isRisk = false
  for (const piece of opponentPieces) {
    const validMoves = moves.getValidMoves(type(piece), store.state, piece.id)
    if (validMoves.includes(thisKingLoc)) {
      isRisk = true
      break
    }
  }
  return isRisk
}

/*********************
 * *** HELPER FUNCS **
 * *******************
 */
function type (space) {
  return space.occupant.split('-')[0]
}
function turnColor () {
  return store.state.turn ? 'w' : 'b'
}
function getColor (space) {
  return space.occupant === 'empty'
    ? null
    : space.occupant.split('-')[1].substring(0, 1)
}
function getPieceType () {
  const space = store.state.board.filter(x => {
    return x.id === store.state.selected
  })[0]
  return type(space)
}

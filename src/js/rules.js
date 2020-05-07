import store from '../../store/index.js'
const moves = require('./moves.js')

export function getMoves () {
  return moves.getValidMoves(getPieceType(), store.state, store.state.selected)
}

// export function inCheck (to) {
//   console.log('will this move put you in check? ')
//   const thisKing = !store.state.turn ? 'king-w' : 'king-b'
//   let thisKingLoc = null
//   let target = null
//   let selected = null
//   const opponentPieces = []

//   // get copies of selected and target spaces
//   // set selected space to empty
//   // get the king location
//   for (const space of store.state.board) {
//     if (space.occupant === thisKing) {
//       thisKingLoc = space.id
//     }
//     if (space.id === to) {
//       target = space.occupant
//     }
//     if (space.id === store.state.selected) {
//       selected = space.occupant
//       space.occupant = 'empty'
//     }
//   }

//   if (thisKingLoc === store.state.selected) {
//     thisKingLoc = to
//   }

//   // simulate move
//   for (const space of store.state.board) {
//     if (space.id === to) {
//       space.occupant = selected
//     }
//   }

//   for (const space of store.state.board) {
//     if (getColor(space) === turnColor()) {
//       opponentPieces.push(space)
//     }
//   }

//   // can they get you?
//   let isRisk = false
//   let validMoves = []
//   for (const piece of opponentPieces) {
//     validMoves = moves.getValidMoves(type(piece), store.state, piece.id)
//     if (validMoves.includes(thisKingLoc)) {
//       console.log(piece + ' is a risk to king at ' + thisKingLoc)
//       isRisk = true
//       break
//     }
//   }

//   // reverse the move
//   for (const space of store.state.board) {
//     if (space.id === store.state.selected) {
//       space.occupant = selected
//     }
//     if (space.id === to) {
//       space.occupant = target
//     }
//   }

//   return isRisk
// }

// export function opponentInCheck () {
//   if (Math.random() < 0.5) {
//     return true
//   }

//   return false
// }

function type (space) {
  return space.occupant.split('-')[0]
}
// function turnColor () {
//   return store.state.turn ? 'w' : 'b'
// }
// function getColor (space) {
//   return space.occupant === 'empty' ? null : space.occupant.split('-')[1]
// }
function getPieceType () {
  for (const space of store.state.board) {
    if (space.id === store.state.selected) {
      return type(space)
    }
  }
}

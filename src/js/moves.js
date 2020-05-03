const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const pawnStarts = {
  black: cols.map(x => x + 7),
  white: cols.map(x => x + 2)
}

export function canMove (piece, to, state) {
  const validMoves = getValidMoves(piece, state)
  return validMoves.includes(to)
}

function getValidMoves (piece, state) {
  switch (piece) {
    case 'pawn':
      return getPawnMoves(state)
    case 'rook':
      return getRookMoves(state)
    case 'knight':
      return getKnightMoves(state)
    case 'bishop':
      return getBishopMoves(state)
    case 'queen':
      return getQueenMoves(state)
    case 'king':
      return getKingMoves(state)
    default:
      return []
  }
}

function getPawnMoves (state) {
  console.log('can pawn move?')
  const letter = state.selected.substring(0, 1)
  const number = Number(state.selected.substring(1))
  const diagnols = cols.filter((col, index) => {
    return (
      (index + 1 < cols.length && cols[index + 1] === letter) ||
      (index - 1 > -1 && cols[index - 1] === letter)
    )
  })
  const validMoves = []
  let moves = 1

  // if the pawn is in its original place, it can move two spaces
  if (pawnStarts[getTurnColor(state)].includes(state.selected)) {
    moves = 2
  }

  // add the next spaces to validMoves if no pieces in the way
  for (let i = 1; i <= moves; i++) {
    if (i === 2 && validMoves.length === 0) {
      break
    }
    const move = state.turn ? letter + (number + i) : letter + (number - i)
    if (isSpaceEmpty(state, move)) {
      validMoves.push(move)
    }
  }

  // the pawn can take diagnol pieces
  for (const letter of diagnols) {
    const space = state.turn ? letter + (number + 1) : letter + (number - 1)
    if (!isSpaceEmpty(state, space)) {
      validMoves.push(space)
    }
  }
  console.log('valid pawn moves')
  console.log(validMoves)
  // TODO do any of these valid moves open up the king?
  return validMoves
}
export function getRookMoves (state) {
  console.log('can rook move?')
  const letter = state.selected.substring(0, 1)
  const number = Number(state.selected.substring(1))
  const validMoves = []

  // moves up
  for (let i = number + 1; i <= 8; i++) {
    const spaceId = letter + i
    if (isSpaceEmpty(state, spaceId)) {
      validMoves.push(spaceId)
    } else if (getTurnColor(state) !== getPieceColor(state, spaceId)) {
      validMoves.push(spaceId)
      break
    } else {
      break
    }
  }
  // moves down
  for (let i = number - 1; i > 0; i--) {
    const spaceId = letter + i
    if (isSpaceEmpty(state, spaceId)) {
      validMoves.push(spaceId)
    } else if (getTurnColor(state) !== getPieceColor(state, spaceId)) {
      validMoves.push(spaceId)
      break
    } else {
      break
    }
  }
  // moves right
  for (let i = cols.indexOf(letter) + 1; i < cols.length; i++) {
    const spaceId = cols[i] + number
    console.log(' to the right ')
    console.log(spaceId)
    if (isSpaceEmpty(state, spaceId)) {
      validMoves.push(spaceId)
    } else if (getTurnColor(state) !== getPieceColor(state, spaceId)) {
      validMoves.push(spaceId)
      break
    } else {
      break
    }
  }
  // moves left
  for (let i = cols.indexOf(letter) - 1; i >= 0; i--) {
    const spaceId = cols[i] + number
    console.log(' to the left ')
    console.log(spaceId)

    if (isSpaceEmpty(state, spaceId)) {
      validMoves.push(spaceId)
    } else if (getTurnColor(state) !== getPieceColor(state, spaceId)) {
      validMoves.push(spaceId)
      break
    } else {
      break
    }
  }
  console.log('valid rook moves')
  console.log(validMoves)
  return validMoves
}
export function getKnightMoves (state) {
  console.log('can knight move?')
  return true
}
export function getBishopMoves (state) {
  console.log('can bishop move?')
  return true
}
export function getQueenMoves (state) {
  console.log('can queen move?')
  return true
}
export function getKingMoves (state) {
  console.log('can king move?')
  return true
}

function isSpaceEmpty (state, space) {
  return state.board.filter(x => x.id === space)[0].occupant === 'empty'
}
function getTurnColor (state) {
  return state.turn ? 'white' : 'black'
}

function getPieceColor (state, space) {
  const pieceColor = state.board
    .filter(x => x.id === space)[0]
    .occupant.split('-')[1]
    .substring(0, 1)
  console.log(pieceColor)
  return pieceColor
}

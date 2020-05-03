const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const pawnStarts = {
  black: cols.map(x => x + 7),
  white: cols.map(x => x + 2)
}

/**
 *
 * @param {*} piece
 * @param {*} to
 * @param {*} state
 */
export function canMove (piece, to, state) {
  const validMoves = getValidMoves(piece, state)
  return validMoves.includes(to)
}

/**
 *
 * @param {*} piece
 * @param {*} state
 */
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

/**
 *
 * @param {*} state
 */
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
/**
 *
 * @param {*} state
 */
function getRookMoves (state) {
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
/**
 *
 * @param {*} state
 */
function getKnightMoves (state) {
  console.log('can knight move?')
  const validMoves = []
  const letterIndex = cols.indexOf(state.selected.substring(0, 1))
  const number = Number(state.selected.substring(1))

  const upOne = number + 1 <= 8
  const downOne = number - 1 > 0
  const upTwo = number + 2 <= 8
  const downTwo = number - 2 > 0
  const rightOne = letterIndex + 1 < 8
  const leftOne = letterIndex - 1 >= 0
  const rightTwo = letterIndex + 2 < 8
  const leftTwo = letterIndex - 2 >= 0

  // up two, right one
  if (upTwo && rightOne) {
    validMoves.push(cols[letterIndex + 1] + (number + 2))
  }
  // up two, left one
  if (upTwo && leftOne) {
    validMoves.push(cols[letterIndex - 1] + (number + 2))
  }
  // down two, left one
  if (downTwo && leftOne) {
    validMoves.push(cols[letterIndex - 1] + (number - 2))
  }
  // down two, right one
  if (downTwo && rightOne) {
    validMoves.push(cols[letterIndex + 1] + (number - 2))
  }
  // up one, right two
  if (upOne && rightTwo) {
    validMoves.push(cols[letterIndex + 2] + (number + 1))
  }
  // up one, left two
  if (upOne && leftTwo) {
    validMoves.push(cols[letterIndex - 2] + (number + 1))
  }
  // down one, right two
  if (downOne && rightTwo) {
    validMoves.push(cols[letterIndex + 2] + (number - 1))
  }
  // down one, left two
  if (downOne && leftTwo) {
    validMoves.push(cols[letterIndex - 2] + (number - 1))
  }

  // remove spots with pieces of the same color
  for (let i = 0; i < validMoves.length; i++) {
    console.log(validMoves[i])
    if (getTurnColor(state) === getPieceColor(state, validMoves[i])) {
      console.log('invalid ' + validMoves[i])
      validMoves[i] = 0
    }
  }

  console.log('valid knight moves')
  console.log(validMoves)
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getBishopMoves (state) {
  console.log('can bishop move?')
  const validMoves = []
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getQueenMoves (state) {
  console.log('can queen move?')
  const validMoves = []
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getKingMoves (state) {
  console.log('can king move?')
  const validMoves = []
  return validMoves
}

/************************
 * **********************
 * **** Helper funcs. ***
 * **********************
 * **********************
 */
function isSpaceEmpty (state, space) {
  return state.board.filter(x => x.id === space)[0].occupant === 'empty'
}
function getTurnColor (state) {
  return state.turn ? 'white' : 'black'
}

function getPieceColor (state, space) {
  const piece = state.board.filter(x => x.id === space)[0].occupant
  if (piece === 'empty') {
    return 'empty'
  }
  const pieceColor = piece.split('-')[1].substring(0, 1)
  return pieceColor === 'w' ? 'white' : 'black'
}

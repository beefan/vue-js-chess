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
  const diagnols = getDiagnols(letter, 1)
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
  //   for (const letter of diagnols) {
  //     const space = state.turn ? letter + (number + 1) : letter + (number - 1)
  //     if (!isSpaceEmpty(state, space)) {
  //       validMoves.push(space)
  //     }
  //   }
  for (const prop in diagnols) {
    if (diagnols[prop] === null) {
      continue
    }
    const space = state.turn
      ? diagnols[prop] + (number + 1)
      : diagnols[prop] + (number - 1)
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
    } else if (!isFriendlyFire(state, spaceId)) {
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
    } else if (!isFriendlyFire(state, spaceId)) {
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
    } else if (!isFriendlyFire(state, spaceId)) {
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
    } else if (!isFriendlyFire(state, spaceId)) {
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
  let target = cols[letterIndex + 1] + (number + 2)
  if (upTwo && rightOne && !isFriendlyFire(state, target)) {
    validMoves.push(target)
  }
  // up two, left one
  target = cols[letterIndex - 1] + (number + 2)
  if (upTwo && leftOne && !isFriendlyFire(state, target)) {
    validMoves.push(target)
  }
  // down two, left one
  target = cols[letterIndex - 1] + (number - 2)
  if (downTwo && leftOne && !isFriendlyFire(state, target)) {
    validMoves.push(target)
  }
  // down two, right one
  target = cols[letterIndex + 1] + (number - 2)
  if (downTwo && rightOne && !isFriendlyFire(state, target)) {
    validMoves.push(target)
  }
  // up one, right two
  target = cols[letterIndex + 2] + (number + 1)
  if (upOne && rightTwo && !isFriendlyFire(state, target)) {
    validMoves.push(target)
  }
  // up one, left two
  target = cols[letterIndex - 2] + (number + 1)
  if (upOne && leftTwo && !isFriendlyFire(state, target)) {
    validMoves.push(target)
  }
  // down one, right two
  target = cols[letterIndex + 2] + (number - 1)
  if (downOne && rightTwo && !isFriendlyFire(state, target)) {
    validMoves.push(target)
  }
  // down one, left two
  target = cols[letterIndex - 2] + (number - 1)
  if (downOne && leftTwo && !isFriendlyFire(state, target)) {
    validMoves.push(target)
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
  const letter = state.selected.substring(0, 1)
  const number = Number(state.selected.substring(1))
  const validMoves = []

  // number increasing to 8
  let left = true
  let right = true
  for (let i = number + 1; i <= 8; i++) {
    const diagnols = getDiagnols(letter, i - number)
    if (left && diagnols.left !== null) {
      if (isSpaceEmpty(state, diagnols.left + i)) {
        validMoves.push(diagnols.left + i)
      } else {
        left = false
      }
    }
    if (right && diagnols.right !== null) {
      if (isSpaceEmpty(state, diagnols.right + i)) {
        validMoves.push(diagnols.right + i)
      } else {
        right = false
      }
    }
  }
  // number decreasing to 0
  left = true
  right = true
  for (let i = number - 1; i > 0; i--) {
    const diagnols = getDiagnols(letter, number - i)
    if (left && diagnols.left !== null) {
      if (
        isSpaceEmpty(state, diagnols.left + i) &&
        !isFriendlyFire(state, diagnols.left + i)
      ) {
        validMoves.push(diagnols.left + i)
      } else {
        left = false
      }
    }
    if (right && diagnols.right !== null) {
      if (
        isSpaceEmpty(state, diagnols.right + i) &&
        !isFriendlyFire(state, diagnols.right + i)
      ) {
        validMoves.push(diagnols.right + i)
      } else {
        right = false
      }
    }
  }
  console.log('bishop valid moves')
  console.log(validMoves)
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getQueenMoves (state) {
  console.log('can queen move?')
  const validMoves = getRookMoves(state).concat(getBishopMoves(state))
  console.log('valid queen moves')
  console.log(validMoves)
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getKingMoves (state) {
  console.log('can king move?')
  const letter = state.selected.substring(0, 1)
  const number = Number(state.selected.substring(1))
  const diagnols = getDiagnols(letter, 1)
  diagnols.center = letter
  const validMoves = []

  for (const prop in diagnols) {
    const ltr = diagnols[prop]
    const targets = []
    if (prop !== 'center') {
      targets.push(ltr + number)
    }
    if (number + 1 <= 8) {
      targets.push(ltr + (number + 1))
    }
    if (number - 1 >= 1) {
      targets.push(ltr + (number - 1))
    }
    for (const target of targets) {
      if (!isFriendlyFire(state, target)) {
        validMoves.push(target)
      }
    }
  }
  console.log('valid king moves')
  console.log(validMoves)
  return validMoves
}

/************************
 * **********************
 * **** Helper funcs. ***
 * **********************
 * **********************
 */
function isSpaceEmpty (state, space) {
  const place = state.board.filter(x => x.id === space)[0]
  return place.occupant === 'empty'
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

function isFriendlyFire (state, space) {
  return getTurnColor(state) === getPieceColor(state, space)
}

function getDiagnols (letter, d) {
  const index = cols.indexOf(letter)
  console.log('letter index ' + index + 'd ' + d)
  return {
    right: index - d > -1 ? cols[index - d] : null,
    left: index + d < cols.length ? cols[index + d] : null
  }
}

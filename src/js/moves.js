const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const pawnStarts = {
  black: cols.map(x => x + 7),
  white: cols.map(x => x + 2)
}

/**
 *
 * @param {*} piece
 * @param {*} state
 */
export function getValidMoves (piece, state, selected) {
  switch (piece) {
    case 'pawn':
      return getPawnMoves(state, selected)
    case 'rook':
      return getRookMoves(state, selected)
    case 'knight':
      return getKnightMoves(state, selected)
    case 'bishop':
      return getBishopMoves(state, selected)
    case 'queen':
      return getQueenMoves(state, selected)
    case 'king':
      return getKingMoves(state, selected)
    default:
      return []
  }
}

/**
 *
 * @param {*} state
 */
function getPawnMoves (state, selected) {
  const letter = selected.substring(0, 1)
  const number = Number(selected.substring(1))
  const diagnols = getDiagnols(letter, 1)
  const validMoves = []
  let moves = 1

  // if the pawn is in its original place, it can move two spaces
  if (pawnStarts[getTurnColor(state)].includes(selected)) {
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
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getRookMoves (state, selected) {
  const letter = selected.substring(0, 1)
  const number = Number(selected.substring(1))
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

    if (isSpaceEmpty(state, spaceId)) {
      validMoves.push(spaceId)
    } else if (!isFriendlyFire(state, spaceId)) {
      validMoves.push(spaceId)
      break
    } else {
      break
    }
  }
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getKnightMoves (state, selected) {
  const validMoves = []
  const letterIndex = cols.indexOf(selected.substring(0, 1))
  const number = Number(selected.substring(1))

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
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getBishopMoves (state, selected) {
  const letter = selected.substring(0, 1)
  const number = Number(selected.substring(1))
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
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getQueenMoves (state, selected) {
  const validMoves = getRookMoves(state, selected).concat(
    getBishopMoves(state, selected)
  )
  return validMoves
}
/**
 *
 * @param {*} state
 */
function getKingMoves (state, selected) {
  const letter = selected.substring(0, 1)
  const number = Number(selected.substring(1))
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
  return {
    right: index - d > -1 ? cols[index - d] : null,
    left: index + d < cols.length ? cols[index + d] : null
  }
}

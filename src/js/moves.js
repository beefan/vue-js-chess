const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const pawnStarts = {
  black: cols.map(x => x + 7),
  white: cols.map(x => x + 2)
}

export function canPawnMove (to, state) {
  console.log('can pawn move?')
  const turnColor = state.turn ? 'white' : 'black'
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
  if (pawnStarts[turnColor].includes(state.selected)) {
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

  return validMoves.includes(to)
}
export function canRookMove (to, state) {
  console.log('can rook move?')
  return true
}
export function canKnightMove (to, state) {
  console.log('can knight move?')
  return true
}
export function canBishopMove (to, state) {
  console.log('can bishop move?')
  return true
}
export function canQueenMove (to, state) {
  console.log('can queen move?')
  return true
}
export function canKingMove (to, state) {
  console.log('can king move?')
  return true
}

function isSpaceEmpty (state, space) {
  return state.board.filter(x => x.id === space)[0].occupant === 'empty'
}

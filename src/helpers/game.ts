import rank from "./rank"

const ANIMAL_VALUE = {
  lion: 100,
  tiger: 80,
  elephant: 60,
  cheetah: 40,
  wolf: 30,
  dog: 20,
  mouse: 20,
  cat: 20,
} as const

const RED_POSITION_VALUE = [
  40, 45, 200, 10000, 200, 45, 40, 35, 40, 45, 200, 45, 40, 35, 30, 35, 40, 45,
  40, 35, 30, 25, 30, 35, 40, 35, 30, 25, 20, 25, 30, 35, 30, 25, 20, 15, 20,
  25, 30, 25, 20, 15, 10, 15, 20, 25, 20, 15, 10, 5, 10, 15, 20, 15, 10, 5, 0,
  5, 10, 15, 10, 5, 0,
] as const

const BLUE_POSITION_VALUE = [
  0, 5, 10, 15, 10, 5, 0, 5, 10, 15, 20, 15, 10, 5, 10, 15, 20, 25, 20, 15, 10,
  15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 35, 30, 25, 20, 25, 30, 35, 40, 35,
  30, 25, 30, 35, 40, 45, 40, 35, 30, 35, 40, 45, 200, 45, 40, 35, 40, 45, 200,
  10000, 200, 45, 40,
] as const

const DEPTH = 4

export const TRAPS = [2, 4, 10, 52, 58, 60]
export const RED_TRAPS = [52, 58, 60]
export const BLUE_TRAPS = [2, 4, 10]
export const RIVER = [22, 23, 25, 26, 29, 30, 32, 33, 36, 37, 39, 40]
// 第二个数组是为了检查中间是否有老鼠挡路
export const JUMP = {
  15: [[43], [[22, 29, 36]]],
  16: [[44], [[23, 30, 37]]],
  18: [[46], [[25, 32, 39]]],
  19: [[47], [[26, 33, 40]]],
  21: [[24], [[22, 23]]],
  24: [
    [21, 27],
    [
      [22, 23],
      [25, 26],
    ],
  ],
  27: [[24], [[25, 26]]],
  28: [[31], [[29, 30]]],
  31: [
    [28, 34],
    [
      [29, 30],
      [32, 33],
    ],
  ],
  34: [[31], [[32, 33]]],
  35: [[38], [[36, 37]]],
  38: [
    [35, 41],
    [
      [36, 37],
      [39, 40],
    ],
  ],
  41: [[38], [[39, 40]]],
  43: [[15], [[22, 29, 36]]],
  44: [[16], [[23, 30, 37]]],
  46: [[18], [[25, 32, 39]]],
  47: [[19], [[26, 33, 40]]],
} as const

/**
 * 标出当前棋子可以走到的格子
 * @param index 格子编号
 * @param dict 当前棋盘
 * @param turn 当前轮到哪一方
 */
export function getPossibleMovesFromBox(
  index: number,
  dict: Board,
  turn: Color
) {
  let possibleMoves = []

  if (index >= 7) {
    possibleMoves.push(index - 7)
  }

  if (index <= 55) {
    possibleMoves.push(index + 7)
  }

  if (index % 7 !== 0) {
    possibleMoves.push(index - 1)
  }

  if ((index + 1) % 7 !== 0) {
    possibleMoves.push(index + 1)
  }

  if (
    index in JUMP &&
    (dict[index].animal === "lion" || dict[index].animal === "tiger")
  ) {
    JUMP[index as keyof typeof JUMP][0].forEach((element, idx) => {
      let canAdd = true
      // 检查中间是否有老鼠挡路
      JUMP[index as keyof typeof JUMP][1][idx].forEach((e) => {
        if (dict[e].piece) {
          canAdd = false
        }
      })
      if (canAdd) {
        possibleMoves.push(element)
      }
    })
  }

  possibleMoves = possibleMoves.filter((box) => {
    if ((box === 3 && turn === "blue") || (box === 59 && turn === "red")) {
      return false
    }

    // 大象不能吃老鼠，所以需要特殊处理
    if (dict[index].animal === "elephant") {
      if (dict[box].animal === "mouse") {
        return false
      }
      return (
        !RIVER.includes(box) && (!dict[box].piece || dict[box].color !== turn)
      )
    }

    if (dict[index].animal !== "mouse") {
      return (
        !RIVER.includes(box) && (!dict[box].piece || dict[box].color !== turn)
      )
    }

    // 老鼠不能从河里直接吃象
    if (RIVER.includes(index)) {
      return (
        dict[box].animal !== "elephant" &&
        (!dict[box].piece || dict[box].color !== turn)
      )
    }
    return !dict[box].piece || dict[box].color !== turn
  })

  return possibleMoves
}

function generateAllPossibleMoves(
  board: Board,
  ownPos: Set<number>,
  turn: Color
) {
  let allMoves: [number, number][] = []
  ownPos.forEach((pos) => {
    const moves = getPossibleMovesFromBox(pos, board, turn)
    moves.forEach((move) => allMoves.push([pos, move]))
  })

  return allMoves
}

function generateStaticScore(
  board: Board,
  ownPos: Set<number>,
  opponentPos: Set<number>,
  turn: Color
) {
  let ownScore = 0
  let opponentScore = 0

  ownPos.forEach((pos) => {
    ownScore +=
      ANIMAL_VALUE[board[pos].animal!] +
      (turn === "red" ? RED_POSITION_VALUE[pos] : BLUE_POSITION_VALUE[pos])
  })

  opponentPos.forEach((pos) => {
    opponentScore +=
      ANIMAL_VALUE[board[pos].animal!] +
      (turn === "blue" ? RED_POSITION_VALUE[pos] : BLUE_POSITION_VALUE[pos])
  })

  return turn === "red" ? opponentScore - ownScore : ownScore - opponentScore
}

function minimax(
  board: Board,
  ownPos: Set<number>,
  opponentPos: Set<number>,
  turn: Color,
  isMaximising: boolean,
  depth: number,
  alpha: number,
  beta: number
): [number, [number, number]] | [number, never[]] {
  if (depth <= 0) {
    return [generateStaticScore(board, ownPos, opponentPos, turn), []]
  }
  const allMoves = generateAllPossibleMoves(board, ownPos, turn)
  let finalScore = isMaximising
    ? -Number.MAX_SAFE_INTEGER
    : Number.MAX_SAFE_INTEGER
  let finalMove: [number, number]

  for (const move of allMoves) {
    let original = { ...board[move[1]] }
    let removed: number | null = null

    let canEat = true
    // 检查是否自杀
    if (
      (!TRAPS.includes(move[1]) ||
        (RED_TRAPS.includes(move[1]) && turn === "blue") ||
        (BLUE_TRAPS.includes(move[1]) && turn === "red")) &&
      board[move[1]].piece &&
      rank[board[move[0]].animal!] < rank[board[move[1]].animal!] &&
      !(
        board[move[0]].animal === "mouse" &&
        board[move[1]].animal === "elephant"
      )
    ) {
      canEat = false
      original = { ...board[move[0]] }
      board[move[0]] = {
        color: board[move[0]].color,
        piece: false,
        animal: null,
      }
      ownPos.delete(move[0])
    } else {
      board[move[1]] = { ...board[move[0]] }
      board[move[0]] = { ...board[move[0]], animal: null, piece: false }

      ownPos.delete(move[0])
      ownPos.add(move[1])
      if (opponentPos.has(move[1])) {
        removed = move[1]
        opponentPos.delete(move[1])
      }
    }

    const [score] = minimax(
      board,
      opponentPos,
      ownPos,
      turn === "red" ? "blue" : "red",
      !isMaximising,
      depth - 1,
      alpha,
      beta
    )

    if (
      (isMaximising && score > finalScore) ||
      (!isMaximising && score < finalScore)
    ) {
      finalScore = score
      finalMove = move
    }

    if (!canEat) {
      board[move[0]] = { ...original }
      ownPos.add(move[0])
    } else {
      board[move[0]] = { ...board[move[1]] }
      board[move[1]] = { ...original }

      ownPos.delete(move[1])
      ownPos.add(move[0])
      if (removed) {
        opponentPos.add(removed)
      }
    }

    if (isMaximising) {
      alpha = Math.max(alpha, score)
    } else {
      beta = Math.min(beta, score)
    }
    if (beta <= alpha) {
      break
    }
  }

  return [finalScore, finalMove!]
}

export function generateMove(
  board: Board,
  ownPos: Set<number>,
  opponentPos: Set<number>,
  turn: Color
) {
  const [_, move] = minimax(
    board,
    ownPos,
    opponentPos,
    turn,
    true,
    DEPTH,
    -Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER
  )
  return move as [number, number]
}

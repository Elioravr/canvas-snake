const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 500
const CELL_SIZE = 20
const NUMBER_OF_CELLS_IN_ROW = WINDOW_WIDTH / CELL_SIZE
const NUMBER_OF_CELLS_IN_COLUMN = WINDOW_HEIGHT / CELL_SIZE
const START_POSITION_SNAKE = {
  x: Math.floor(NUMBER_OF_CELLS_IN_ROW / 2),
  y: Math.floor(NUMBER_OF_CELLS_IN_COLUMN / 2),
}
const INITIAL_LENGTH_OF_SNAKE = 5

const EMPTY_TYPE = 'empty'
const SNAKE_TYPE = 'snake'
const PIZZA_TYPE = 'pizza'

const COLORS = {
  [EMPTY_TYPE]: '5B2CF1',
  [SNAKE_TYPE]: '27029D',
  [PIZZA_TYPE]: '1E0279',
}

const canvas = document.getElementById('canvas')
const currentMatrix = []
const nextMatrix = []
const currentSnakePosition = {...START_POSITION_SNAKE}

let snakeDrawingStarted = false

// // Initializing matrix
// for (let columnIndex = NUMBER_OF_CELLS_IN_COLUMN; columnIndex >= 0; columnIndex--) {
//   const columnMatrix = []

//   for (let rowIndex = NUMBER_OF_CELLS_IN_ROW; rowIndex >= 0; rowIndex--) {
//     if (snakeDrawingStarted && snakeLeftCells > 0 && snakeLeftCells < INITIAL_LENGTH_OF_SNAKE) {
//       snakeLeftCells--
//       columnMatrix.push({type: SNAKE_TYPE})
//     } else if (columnIndex === currentSnakePosition.x && rowIndex === currentSnakePosition.y) {
//       snakeDrawingStarted = true
//       snakeLeftCells--
//       columnMatrix.push({type: SNAKE_TYPE})
//     } else {
//       columnMatrix.push({type: EMPTY_TYPE})
//     }

//   }

//   currentMatrix.push(columnMatrix)
// }

calculateMatrix = (snakePosition) => {
  const matrix = []
  let snakeLeftCells = INITIAL_LENGTH_OF_SNAKE

  // Initializing matrix
  for (let columnIndex = NUMBER_OF_CELLS_IN_COLUMN; columnIndex >= 0; columnIndex--) {
    const columnMatrix = []

    for (let rowIndex = NUMBER_OF_CELLS_IN_ROW; rowIndex >= 0; rowIndex--) {
      if (snakeDrawingStarted && snakeLeftCells > 0 && snakeLeftCells < INITIAL_LENGTH_OF_SNAKE) {
        snakeLeftCells--
        columnMatrix.push({type: SNAKE_TYPE})
      } else if (columnIndex === snakePosition.y && rowIndex === snakePosition.x) {
        snakeDrawingStarted = true
        snakeLeftCells--
        columnMatrix.push({type: SNAKE_TYPE})
      } else {
        columnMatrix.push({type: EMPTY_TYPE})
      }

    }

    matrix.push(columnMatrix)
  }

  return matrix
}

drawMatrix = () => {
  if (currentSnakePosition.x < NUMBER_OF_CELLS_IN_ROW) {
    currentSnakePosition.x++
  }

  const currentMatrix = calculateMatrix(currentSnakePosition)

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')

    currentMatrix.forEach((columnMatrix, columnIndex) => {
      columnMatrix.forEach((currentCell, rowIndex) => {
        // setTimeout(() => {
        //   ctx.fillStyle = `#${COLORS[currentCell.type]}`
        //   ctx.fillRect(rowIndex * CELL_SIZE, columnIndex * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        // }, (rowIndex + columnIndex) * 100)
        // debugger
        ctx.fillStyle = `#${COLORS[currentCell.type]}`
        ctx.fillRect(rowIndex * CELL_SIZE, columnIndex * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      })
    })

    // ctx.fillRect(25, 25, 100, 100)
    // ctx.clearRect(45, 45, 60, 60)
    // ctx.strokeRect(50, 50, 50, 50)
  }
}

const gameInterval = setInterval(drawMatrix, 100)
drawMatrix()


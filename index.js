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
const GAME_SPEED = 300

const EMPTY_TYPE = 'empty'
const SNAKE_TYPE = 'snake'
const SNAKE_HEAD_TYPE = 'snakeHead'
const PIZZA_TYPE = 'pizza'

const LEFT_DIRECTION = 'left'
const TOP_DIRECTION = 'top'
const RIGHT_DIRECTION = 'right'
const BOTTOM_DIRECTION = 'bottom'

const COLORS = {
  [EMPTY_TYPE]: '5B2CF1',
  [SNAKE_TYPE]: '27029D',
  [SNAKE_HEAD_TYPE]: '000',
  [PIZZA_TYPE]: '1E0279',
}

const canvas = document.getElementById('canvas')
const currentMatrix = []
const nextMatrix = []
let currentSnakePosition = {...START_POSITION_SNAKE}

let snakeDrawingStarted = false
let snakeDirection = 'left'

calculateMatrix = (snakePosition) => {
  const matrix = []
  let snakeLeftCells = INITIAL_LENGTH_OF_SNAKE

  // Initializing matrix
  for (let columnIndex = NUMBER_OF_CELLS_IN_COLUMN; columnIndex >= 0; columnIndex--) {
    const columnMatrix = []

    for (let rowIndex = NUMBER_OF_CELLS_IN_ROW; rowIndex >= 0; rowIndex--) {
      if (snakeDrawingStarted && snakeLeftCells > 0 && snakeLeftCells < INITIAL_LENGTH_OF_SNAKE) {
        snakeLeftCells--
        columnMatrix.push({type: SNAKE_TYPE, index: snakeLeftCells})
      } else if (columnIndex === snakePosition.y && rowIndex === snakePosition.x) {
        snakeDrawingStarted = true
        snakeLeftCells--
        columnMatrix.push({type: SNAKE_HEAD_TYPE, index: snakeLeftCells})
      } else {
        columnMatrix.push({type: EMPTY_TYPE})
      }

    }

    matrix.push(columnMatrix)
  }

  return matrix
}

calculateNextSnakePosition = () => {
  const snakePosition = {...currentSnakePosition}
  switch (snakeDirection) {
    case LEFT_DIRECTION: {
      if (snakePosition.x < NUMBER_OF_CELLS_IN_ROW) {
        console.log('direction: LEFT_DIRECTION')
        snakePosition.x++
      }

      break
    }
    case RIGHT_DIRECTION: {
      if (snakePosition.x < 0) {
        console.log('direction: RIGHT_DIRECTION')
        snakePosition.x--
      }

      break
    }
    case TOP_DIRECTION: {
      if (snakePosition.y < NUMBER_OF_CELLS_IN_COLUMN) {
        console.log('direction: TOP_DIRECTION')
        snakePosition.y++
      }

      break
    }
    case BOTTOM_DIRECTION: {
      if (snakePosition.y < 0) {
        console.log('direction: BOTTOM_DIRECTION')
        snakePosition.y--
      }

      break
    }
  }

  return snakePosition
}

drawMatrix = () => {
  currentSnakePosition = calculateNextSnakePosition()
  console.log('index.js currentSnakePosition', currentSnakePosition)
  const currentMatrix = calculateMatrix(currentSnakePosition)

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')

    currentMatrix.forEach((columnMatrix, columnIndex) => {
      columnMatrix.forEach((currentCell, rowIndex) => {
        ctx.fillStyle = `#${COLORS[currentCell.type]}`
        ctx.fillRect(rowIndex * CELL_SIZE, columnIndex * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      })
    })
  }
}

let gameInterval = setInterval(drawMatrix, GAME_SPEED)
drawMatrix()

// Initializing document events
document.addEventListener('keydown', ({keyCode}) => {
  console.log('index.js keyCode', keyCode)
  switch (keyCode) {
    case 37: {
      console.log('index.js left')
      clearInterval(gameInterval)
      snakeDirection = LEFT_DIRECTION
      gameInterval = setInterval(drawMatrix, GAME_SPEED)
      break
    }
    case 38: {
      console.log('index.js top')
      clearInterval(gameInterval)
      snakeDirection = TOP_DIRECTION
      gameInterval = setInterval(drawMatrix, GAME_SPEED)
      break
    }
    case 39: {
      console.log('index.js right')
      clearInterval(gameInterval)
      snakeDirection = RIGHT_DIRECTION
      gameInterval = setInterval(drawMatrix, GAME_SPEED)
      break
    }
    case 40: {
      console.log('index.js bottom')
      clearInterval(gameInterval)
      snakeDirection = BOTTOM_DIRECTION
      gameInterval = setInterval(drawMatrix, GAME_SPEED)
      break
    }
    default: {
      console.log('other')
      break
    }
  }
})

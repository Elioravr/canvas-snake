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
const GAME_SPEED = 50

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
  [PIZZA_TYPE]: 'FFFA5C',
}

class Snake {
  constructor({x, y, length}) {
    this.cells = []
    this.headPosition = {x, y}

    for (let index = 0; index < length; index++) {
      this.cells.push({
        x: this.headPosition.x + index,
        y: this.headPosition.y,
        index
      })
    }

    this.calculateReversedCells()
  }

  calculateNewPositionByDirection(direction) {
    this.direction = direction
    this.reversedCells.forEach(cell => {
      if (cell.index === 0) {
        this._calculateNewCellPositionByDirection(cell, direction)
      } else {
        this._calculateNewCellPositionByLastCell(cell, direction)
      }
    })
  }

  _calculateNewCellPositionByLastCell(cell) {
    const {x, y} = this.cells[cell.index - 1]
    cell.x = x
    cell.y = y
  }

  _calculateNewCellPositionByDirection(cell, direction) {
    switch (direction) {
      case LEFT_DIRECTION: {
        if (cell.x > 0) {
          cell.x--
        }

        break
      }
      case RIGHT_DIRECTION: {
        if (cell.x < NUMBER_OF_CELLS_IN_ROW) {
          cell.x++
        }

        break
      }
      case TOP_DIRECTION: {
        if (cell.y > 0) {
          cell.y--
        }

        break
      }
      case BOTTOM_DIRECTION: {
        if (cell.y < NUMBER_OF_CELLS_IN_COLUMN) {
          cell.y++
        }

        break
      }
    }
  }

  isPositionTouchingSnake({x, y}) {
    return this.cells.some(cell => {
      return cell.x === x && cell.y === y
    })

    return false
  }

  calculateReversedCells() {
    this.reversedCells = [...this.cells].reverse()
  }

  grow() {
    const lastCell = this.cells[this.cells.length - 1]
    const newPosition = {x: lastCell.x, y: lastCell.y}

    switch (this.direction) {
      case LEFT_DIRECTION: {
        newPosition.x++
        break
      }
      case RIGHT_DIRECTION: {
        newPosition.x--
        break
      }
      case TOP_DIRECTION: {
        newPosition.y--
        break
      }
      case BOTTOM_DIRECTION: {
        newPosition.y++
        break
      }
    }

    this.cells.push({
      ...newPosition,
      index: lastCell.index + 1
    })

    this.calculateReversedCells()
  }

  getCells() { return this.cells }
}

const canvas = document.getElementById('canvas')
const currentMatrix = []
const nextMatrix = []
const snake = new Snake({...START_POSITION_SNAKE, length: INITIAL_LENGTH_OF_SNAKE})
let currentSnakePosition = {...START_POSITION_SNAKE}
const pizzaPosition = {}

let snakeDrawingStarted = false
let snakeDirection = 'left'

repositionPizza = () => {
  pizzaPosition.x = Math.floor(Math.random() * NUMBER_OF_CELLS_IN_ROW)
  pizzaPosition.y = Math.floor(Math.random() * NUMBER_OF_CELLS_IN_COLUMN)

  if (snake.isPositionTouchingSnake(pizzaPosition)) {
    repositionPizza()
  }
}

repositionPizza()

calculateMatrix = (snakePosition) => {
  const matrix = []

  snake.calculateNewPositionByDirection(snakeDirection)
  const cells = snake.getCells()

  if (snake.isPositionTouchingSnake(pizzaPosition)) {
    repositionPizza()
    snake.grow()
  }

  // Initializing matrix
  for (let columnIndex = 0; columnIndex < NUMBER_OF_CELLS_IN_COLUMN; columnIndex++) {
    const columnMatrix = []

    for (let rowIndex = 0; rowIndex < NUMBER_OF_CELLS_IN_ROW; rowIndex++) {
      columnMatrix.push({type: EMPTY_TYPE})
    }

    matrix.push(columnMatrix)
  }

  // Add snake to the matrix
  cells.forEach(snakeCell => {
    matrix[snakeCell.y][snakeCell.x].type = SNAKE_TYPE
  })

  // Add the pizza to the matrix
  matrix[pizzaPosition.y][pizzaPosition.x].type = PIZZA_TYPE

  return matrix
}

drawMatrix = () => {
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

  if (currentSnakePosition.x === 0) {
    return clearInterval(gameInterval)
  }
}

let gameInterval = setInterval(drawMatrix, GAME_SPEED)
drawMatrix()

// Initializing document events
document.addEventListener('keydown', ({keyCode}) => {
  switch (keyCode) {
    case 37: {
      clearInterval(gameInterval)
      snakeDirection = LEFT_DIRECTION
      gameInterval = setInterval(drawMatrix, GAME_SPEED)
      break
    }
    case 38: {
      clearInterval(gameInterval)
      snakeDirection = TOP_DIRECTION
      gameInterval = setInterval(drawMatrix, GAME_SPEED)
      break
    }
    case 39: {
      clearInterval(gameInterval)
      snakeDirection = RIGHT_DIRECTION
      gameInterval = setInterval(drawMatrix, GAME_SPEED)
      break
    }
    case 40: {
      clearInterval(gameInterval)
      snakeDirection = BOTTOM_DIRECTION
      gameInterval = setInterval(drawMatrix, GAME_SPEED)
      break
    }
    default: {
      break
    }
  }
})

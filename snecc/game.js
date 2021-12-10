import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, init as initSnake, getSnakeHead, snakeIntersection, SCORE} from "./snake.js"
import {update as updateFood, draw as drawFood} from './food.js'
import {GRID_SIZE, outsideGrid} from './grid.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
let gameOver = false
gameBoard.style.setProperty('grid-template-rows', `repeat(${GRID_SIZE}, 1fr)`)
gameBoard.style.setProperty('grid-template-columns', `repeat(${GRID_SIZE}, 1fr)`)

init()

function init(){
    initSnake(GRID_SIZE)
}

function main(currentTime) {
    if (gameOver){
        if (confirm(`Score: ${SCORE}\nPress Ok and try again`)){
            window.location='/snecc/index.html'
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if (secondsSinceLastRender < 1/SNAKE_SPEED){
        return
    }
    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}
function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
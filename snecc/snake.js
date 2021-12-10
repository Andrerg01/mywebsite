import { getInputDirection } from "./input.js"
import {GRID_SIZE} from './grid.js'

export const SNAKE_SPEED = 10

let snakeBody = [{x:1, y:1}]
let newSegments = 0
export let SCORE = 0

export function init(GRID_SIZE){
    snakeBody = [
        {x: Math.round(GRID_SIZE/2), y: Math.round(GRID_SIZE/2)}
    ]
}

export function update(){
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = { ...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
    console.log(onSnake({x:5, y:4}))
}

export function draw(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(EXPANSION_RATE){
    newSegments += EXPANSION_RATE
    SCORE += EXPANSION_RATE
}

export function onSnake(position, { ignoreHead = false} = {}){
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
    
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], { ignoreHead: true})
}

function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0
}

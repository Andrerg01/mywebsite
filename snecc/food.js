import {onSnake, expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 4

export function update(){
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard){
    const foodElem = document.createElement('div')
    foodElem.style.gridRowStart = food.y
    foodElem.style.gridColumnStart = food.x
    foodElem.classList.add('food')
    gameBoard.appendChild(foodElem)
}

function getRandomFoodPosition(){
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

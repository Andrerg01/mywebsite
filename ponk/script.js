import {init as initBall, update as updateBall, leftCollision, rightCollision} from './ball.js'
import {update as updatePaddle_1, init as initPaddle_1} from './paddle_1.js'
import {update as updatePaddle_2, init as initPaddle_2} from './paddle_2.js'

document.addEventListener('keypress', handleStart, {once: true})

const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")
const leftScore = document.querySelector("[data-score-1]")
const rightScore = document.querySelector("[data-score-2]")


let lastTime
function updateLoop(time){
    if (lastTime==null){
        lastTime=time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBall(delta)
    updatePaddle_1(delta)
    updatePaddle_2(delta)
    if (leftCollision()){
        updateRightScore()
    }
    if (rightCollision()){
        updateLeftScore()
    }
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function handleStart(){
    title.classList.add('hide')
    subtitle.classList.add('hide')

    initBall()
    initPaddle_1()
    initPaddle_2()
    //setupBird()
    //setupPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

function updateRightScore(){
    rightScore.innerText = (parseInt(rightScore.innerText) + 1).toString()
    return
}

function updateLeftScore(){
    leftScore.innerText = (parseInt(leftScore.innerText) + 1).toString()
    return
}
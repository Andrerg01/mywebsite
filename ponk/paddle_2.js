let PADDLE_Y = Math.floor(window.innerHeight/2)
let PADDLE_DIRECTION = 0

const PADDLE_SPEED = .3
const paddle = document.querySelector('[data-paddle-2]')
let paddleRect = getPaddleRect()

const bottomBound = document.querySelector('[data-bottom-bound]')
const topBound = document.querySelector('[data-top-bound]')

const bottomBoundRect = getRect(bottomBound)
const topBoundRect = getRect(topBound)

const ball = document.querySelector('[data-ball]')
let ballRect = getRect(ball)

function getRect(element){
    return element.getBoundingClientRect()
}

export function getPaddleRect(){
    return getRect(paddle)
}
export function init(){
    setPosition(PADDLE_Y)
}

export function update(delta){
    paddleRect = getPaddleRect()
    ballRect = getRect(ball)
    if (ballRect.top < paddleRect.top){
        PADDLE_DIRECTION = -1
    }else if(ballRect.bottom > paddleRect.bottom){
        PADDLE_DIRECTION = 1
    }else{
        PADDLE_DIRECTION = 0
    }

    PADDLE_Y = PADDLE_Y + PADDLE_DIRECTION * PADDLE_SPEED * delta
    setPosition(PADDLE_Y)
    if (paddleRect.top <= topBoundRect.bottom && (PADDLE_DIRECTION == -1 || PADDLE_DIRECTION == 0)){
        PADDLE_Y = topBoundRect.bottom
        PADDLE_DIRECTION = 0
    }else if (paddleRect.bottom >= bottomBoundRect.top && (PADDLE_DIRECTION == 1 || PADDLE_DIRECTION == 0)){
        PADDLE_Y = bottomBoundRect.top - parseFloat(getComputedStyle(paddle).height)
        PADDLE_DIRECTION = 0
    }
    setPosition(PADDLE_Y)
}

function stopPaddle(event){
    PADDLE_DIRECTION = 0
}

function setPosition(position){
    paddle.style.setProperty('--paddle-1-y', position)
}
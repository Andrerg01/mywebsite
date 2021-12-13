let PADDLE_Y = Math.floor(window.innerHeight/2)
let PADDLE_DIRECTION = 0

const PADDLE_SPEED = 1
const paddle = document.querySelector('[data-paddle-1]')
let paddleRect = getPaddleRect()

const bottomBound = document.querySelector('[data-bottom-bound]')
const topBound = document.querySelector('[data-top-bound]')

const bottomBoundRect = getRect(bottomBound)
const topBoundRect = getRect(topBound)

function getRect(element){
    return element.getBoundingClientRect()
}

export function getPaddleRect(){
    return getRect(paddle)
}
export function init(){
    setPosition(PADDLE_Y)
    // document.removeEventListener('keydown', movePaddle)
    document.addEventListener('keydown', movePaddle)
    document.addEventListener('keyup', stopPaddle)
}

export function update(delta){
    paddleRect = getPaddleRect()
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

function movePaddle(event){
    if (event.keyCode == 38){
        PADDLE_DIRECTION = -1
    }else if(event.keyCode == 40){
        PADDLE_DIRECTION = 1
    }
}

function stopPaddle(event){
    PADDLE_DIRECTION = 0
}

function setPosition(position){
    paddle.style.setProperty('--paddle-1-y', position)
}
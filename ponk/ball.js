let BALL_SPEED = .2
const BALL_DIRECTION = {x:BALL_SPEED/Math.sqrt(2),y:BALL_SPEED/Math.sqrt(2)}
const ball = document.querySelector('[data-ball]')
const directionVariationFactor = 0.05
const acceleration = 0.1

export const BALL_POSITION = {
    x:Math.floor(window.innerWidth/2) - parseFloat(getComputedStyle(ball).width)/2, 
    y:Math.floor(window.innerHeight/2) - parseFloat(getComputedStyle(ball).height)/2
}

const bottomBound = document.querySelector('[data-bottom-bound]')
const topBound = document.querySelector('[data-top-bound]')
const rightBound = document.querySelector('[data-right-bound]')
const leftBound = document.querySelector('[data-left-bound]')

const bottomBoundRect = getRect(bottomBound)
const topBoundRect = getRect(topBound)
const rightBoundRect = getRect(rightBound)
const leftBoundRect = getRect(leftBound)

const ballRadius = parseFloat(getComputedStyle(ball).width)/2

const paddle_1 = document.querySelector('[data-paddle-1]')
const paddle_2 = document.querySelector('[data-paddle-2]')

let paddle_1Rect = getRect(paddle_1)
let paddle_2Rect = getRect(paddle_2)

let ballRect = getBallRect()


export function init(){
    setPosition(BALL_POSITION)
    let direction_x = Math.random() * 2 - 1
    let direction_y = Math.random() * 2 - 1
    BALL_DIRECTION.x = direction_x/(Math.sqrt(direction_x**2 + direction_y**2))
    BALL_DIRECTION.y = direction_y/(Math.sqrt(direction_x**2 + direction_y**2))
}

function setPosition(position){
    ball.style.setProperty("--ball-x", position.x)
    ball.style.setProperty("--ball-y", position.y)
}

export function getBallRect(){
    return getRect(ball)
}

function getRect(element){
    return element.getBoundingClientRect()
}

export function update(delta){
    BALL_POSITION.x = BALL_POSITION.x + BALL_DIRECTION.x * BALL_SPEED * delta
    BALL_POSITION.y = BALL_POSITION.y + BALL_DIRECTION.y * BALL_SPEED * delta

    ballRect = getBallRect()
    paddle_1Rect = getRect(paddle_1)
    paddle_2Rect = getRect(paddle_2)
    
    if (topCollision()){
        BALL_POSITION.y = topBoundRect.bottom
        reflectY()
    }else if(bottomCollision()){
        BALL_POSITION.y = bottomBoundRect.top - ballRadius*2
        reflectY()
    }
    if (leftCollision()){
        BALL_POSITION.x = leftBoundRect.right
        reflectX()
    }else if(rightCollision()){
        BALL_POSITION.x = rightBoundRect.left - ballRadius*2
        reflectX()
    }
    if (isCollision(ballRect, paddle_1Rect)){
        handlePaddleCollision(paddle_1Rect, 1)
    }
    if (isCollision(ballRect, paddle_2Rect)){
        handlePaddleCollision(paddle_2Rect, 2)
    }
    
    setPosition(BALL_POSITION)
}

function reflectX(){
    BALL_DIRECTION.x = -BALL_DIRECTION.x
}

function reflectY(){
    BALL_DIRECTION.y = -BALL_DIRECTION.y
}

function topCollision(){
    return ballRect.top < topBoundRect.bottom
}

function bottomCollision(){
    return ballRect.bottom > bottomBoundRect.top
}

export function leftCollision(){
    return ballRect.left < leftBoundRect.right
}

export function rightCollision(){
    return ballRect.right > rightBoundRect.left
}

export function handlePaddleCollision(paddleRect, number){
    if (number == 1 && ballRect.left < paddleRect.right && BALL_DIRECTION.x < 0){
        BALL_POSITION.x = paddleRect.right
        reflectX()
        varyBallDirection(directionVariationFactor)
        BALL_SPEED = BALL_SPEED*(1+acceleration) 
        beep()
    }
    if (number == 2 && ballRect.right > paddleRect.left && BALL_DIRECTION.x > 0){
        BALL_POSITION.x = paddleRect.left - ballRadius*2
        reflectX()
        varyBallDirection(directionVariationFactor)
        BALL_SPEED = BALL_SPEED*(1+acceleration) 
        beep()
    }
}

function isCollision(rect1, rect2){
    return (
        rect1.left < rect2.right && 
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function varyBallDirection(factor, ){
    let dir_x = BALL_DIRECTION.x + factor*(Math.random()*2-1)
    let dir_y = BALL_DIRECTION.y + factor*(Math.random()*2-1)
    BALL_DIRECTION.x = dir_x/Math.sqrt(dir_x**2 + dir_y**2)
    BALL_DIRECTION.y = dir_y/Math.sqrt(dir_x**2 + dir_y**2)
    
    
}
function beep() {
    var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}
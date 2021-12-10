let inputDirection = {x:0, y:0}
let lastInputDirection = {x:0, y:0}

window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 87:
            if (lastInputDirection.y !== 0) break
            inputDirection = {x:0,y:-1}
            break
        case 83:
            if (lastInputDirection.y !== 0) break
            inputDirection = {x:0,y:1}
            break
        case 65:
            if (lastInputDirection.x !== 0) break
            inputDirection = {x:-1,y:0}
            break
        case 68:
            if (lastInputDirection.x !== 0) break
            inputDirection = {x:1,y:0}
            break                
    }
})

export function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection
}
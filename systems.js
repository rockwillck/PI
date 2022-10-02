const width = 1536
const height = 1024
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = width
canvas.height = height
function resized() {
    scaleFactor = window.innerWidth/width > window.innerHeight/height ? window.innerHeight/height : window.innerWidth/width

    canvas.style.width = parseInt(width * scaleFactor) + "px"
    canvas.style.height = parseInt(height * scaleFactor) + "px"
}

resized()
ctx.imageSmoothingEnabled = false;

class StateMachine {
    constructor(initialState) {
        this.state = initialState
    }

    stateManager(state, ...others) {
        if (this.state == state) {
            others[0]()
        }
        
        for (let i=0; i<others.length/2; i++){
            if (this.state == others[(i)*2 + 1]) {
                others[(i+1)*2]()
            }
        }
    } 
}

var font = "regular"
var sizeMultiplier = 1
function fillPixelText(text, x, y) {
    ctx.save()
    ctx.translate(x, y)
    ctx.fillText(text, 0, 0)
    ctx.restore()
}

window.addEventListener("keydown", (event) => {
    if (talking) {
        talking = false
    }
    keydown(event.key)
})

window.addEventListener("mousedown", (event) => {
    var rect = canvas.getBoundingClientRect();

    mouseX = ((event.clientX - rect.left)/(window.innerWidth - rect.left*2))*canvas.width
    mouseY = ((event.clientY - rect.top)/(window.innerHeight - rect.top*2))*canvas.height

    click([mouseX, mouseY])
})

let lastId
var mousePosition = [0, 0]
window.addEventListener("mousemove", (event) => {
    var rect = canvas.getBoundingClientRect();

    clearInterval(lastId)
    lastId = setInterval(() => {
        mouseX = ((event.clientX - rect.left)/(window.innerWidth - rect.left*2))*canvas.width
        mouseY = ((event.clientY - rect.top)/(window.innerHeight - rect.top*2))*canvas.height
    
        mousePosition = [mouseX, mouseY]
    }, 1)
})

var currentDia = ""
var targetDia = ""
var speaking = ""
var talking = false
function dialogic(speaker, dialogue) {
    talking = true
    currentDia = ""
    targetDia = dialogue
    speaking = speaker
}

function talking_runtime() {
    ctx.fillStyle = "black"
    if (talking) {
        ctx.fillStyle = "black"
        for(i=0;i<=canvas.height*0.4;i++) {
            ctx.save()
            ctx.globalAlpha = i/(canvas.height*0.15)
            ctx.fillRect(0, canvas.height*0.6 + i, canvas.width, 1)
            ctx.restore()
        }
        ctx.font = `${50*sizeMultiplier}px ${font}`
        ctx.fillStyle = "white"
        fillPixelText(speaking, 40, canvas.height*0.8)
    
        ctx.font = `${25*sizeMultiplier}px ${font}`
        x = 0
        y = 0
        words = currentDia.split(" ")
        for (i=0;i<currentDia.split(" ").length;i++) {
            if (40 + 17*(x + words[i].length) > canvas.width - 40) {
                y ++
                x = 0
            }

            fillPixelText(words[i], 40 + 17*sizeMultiplier*x, canvas.height*0.85 + 30*sizeMultiplier*y)
            x += words[i].length + 0.5
        }
        if (currentDia.length != targetDia.length) {
            currentDia += targetDia[currentDia.length]
        }

        ctx.strokeStyle = "white"
        ctx.lineWidth = 10
        fillPixelText("[space] to continue", canvas.width*0.5 - 8.5*sizeMultiplier*10, canvas.height*0.95)
    }
}
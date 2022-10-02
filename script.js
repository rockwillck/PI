function keydown(key) {
}

function click(position) {
}

function distance(xy) {
    return Math.sqrt((xy[0] - canvas.width/2) ** 2 + (xy[1] - canvas.height/2) ** 2)
}

var shaking = false
var shakeFactor = 10
var radius = canvas.height * 0.4
var points = []
var pi = [0, 0]
function runtime() {
    ctx.save()
    if (shaking) {
        ctx.translate(Math.random() < 0.5 ? -Math.random()*shakeFactor : Math.random()*shakeFactor, Math.random() < 0.5 ? -Math.random()*shakeFactor : Math.random()*shakeFactor)
    }

    ctx.strokeStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, 2*Math.PI)
    ctx.closePath()
    ctx.stroke()

    points.push([Math.random()*2*radius + (canvas.width - 2*radius)/2, Math.random()*2*radius + (canvas.height - 2*radius)/2])
    points.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point[0], point[1], 2, 0, 2*Math.PI)
        ctx.closePath()
        if (distance(point) <= radius) {
            ctx.fillStyle = "white"
            pi[0]++
        } else {
            ctx.fillStyle = "red"
            pi[1]++
        }
        ctx.fill()
    })

    ctx.fillStyle = "white"
    ctx.font = "25px Arial"
    ctx.fillText("PI: " + pi[0]/(pi[1] + pi[0]) * 4, 100, 100)
    pi = [0, 0]

    ctx.restore()
}
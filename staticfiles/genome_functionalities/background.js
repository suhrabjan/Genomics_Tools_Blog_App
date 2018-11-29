const canvas = document.getElementById('bgd-anime');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const offCanvas = document.createElement('canvas');
offCanvas.width = 500;
offCanvas.height = 100;
const ctx2 = offCanvas.getContext('2d');
let arr = [];
const fontSize = 10;
const mouse = {
    x : undefined,
    y : undefined
}

function offDraw() {
    ctx2.font = '100px Arial';
    ctx2.fillStyle = '#FF4233';
    ctx2.fillText('A', 0, 100);
    ctx2.fillStyle = '#235789';
    ctx2.fillText('T', 100, 100);
    ctx2.fillStyle = '#FF8F00';
    ctx2.fillText('G', 200, 100);
    ctx2.fillStyle = '#04ADBF';
    ctx2.fillText('C', 300, 100);
    ctx2.fillStyle = 'pink';
    ctx2.fillText('U', 400, 100);
}

// function offDraw() {
//     ctx2.font = '100px Arial';
//     ctx2.fillStyle = '#054549';
//     ctx2.fillText('A', 0, 100);
//     ctx2.fillStyle = '#618C88';
//     ctx2.fillText('T', 100, 100);
//     ctx2.fillStyle = '#FF8F00';
//     ctx2.fillText('G', 200, 100);
//     ctx2.fillStyle = '#022667';
//     ctx2.fillText('C', 300, 100);
//     ctx2.fillStyle = '#ED2B32';
//     ctx2.fillText('U', 400, 100);
// }

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Nucleotide(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.dWidth = 10;
    this.dHeight = 10;
    this.sWidth = 100;
    this.sHeight = 100;
    this.sx = Math.floor(Math.random() * 5) * 100;
    this.sy = 0;
    this.angle = ((Math.random() - 0.5) * 2) * 2 * Math.PI;
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;


    this.draw = function() {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(offCanvas, this.sx, this.sy, this.sWidth, this.sHeight, 0, 0, this.dWidth, this.dHeight);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.update = function (){
        if (this.x > innerWidth - fontSize || this.x < 10) {
            this.dx = -this.dx;
        }
        if (this.y > innerHeight - fontSize || this.y < 10) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.angle += (0.05)*plusOrMinus;


        if (Math.abs(mouse.x - this.x) <= 70 && Math.abs(mouse.y - this.y) <= 70 && this.dWidth < 50 && this.dHeight < 50) {
            this.dWidth += 2;
            this.dHeight += 2;
        } else if (this.dWidth > 9 && this.dHeight > 9){
            this.dWidth -= 2;
            this.dHeight -= 2;
        }
    }
}

function init() {
    arr = [];
    for (let i = 0; i < 200; ++i){
        let x = Math.floor(Math.random() * (innerWidth - 50) + 25);
        let y = Math.floor(Math.random() * (innerHeight - 40) + 20);
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
        arr.push(new Nucleotide(x, y, dx, dy));
    }
}

function main() {
    requestAnimationFrame(main);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (let i=0; i<arr.length; ++i) {
        arr[i].draw();
        arr[i].update();
    }
}
offDraw();
init();
main();

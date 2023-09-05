let video;
let styleType = 0;

let density = "@%#*+=-:. ";

function saveToFile(){
    saveCanvas('ASCII', 'png');
}

function setup(){
    video = createCapture(VIDEO);
    let { width, height } = video.size();
    video.size(windowWidth - 20, windowWidth * (height / width));
    video.hide();
    cnv = createCanvas(windowWidth - 20, windowWidth * (height / width));
    cnv.id('mycanvas');
    saveBtn = createButton('save');
    saveBtn.position(0, windowWidth * (height / width) + 60);
    saveBtn.mousePressed(saveToFile);
    saveBtn.id('saveBtn');
}

function draw(){
    background(255);
    let gridSize = floor(windowWidth / 125);
    video.loadPixels();
    for (let y = 0; y < video.height; y += gridSize) {
        for (let x = 0; x < video.width; x += gridSize) {
            let index = (y * video.width - x) * 4;
            let [r, g, b] = video.pixels.slice(index, index + 3);
            let avg = floor((r + g + b) / 3);
            let ind = floor(map(avg, 0, 255, 0, density.length));
            let dia = floor(map(avg, 0, 255, gridSize, 0));
            fill(0);
            noStroke();
            textSize(gridSize);
            if (styleType == 0) {
                text(density.charAt(ind), x, y);
            } else if (styleType == 1) {
                circle(x + gridSize / 2, y + gridSize / 2, dia);
            } else {
                square(x + gridSize / 2, y + gridSize / 2, dia);
            }
        }
    }
}

function changeStyle(elem) {
    styleType = elem.value;
    console.log(styleType);
}
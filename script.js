let video;
let styleType = 0;

const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,^`'. ";

const saveToFile = () => {
    saveCanvas('ASCII', 'png');
};

const setup = () => {
    const video = createCapture(VIDEO);
    const { width, height } = video;
    video.size(windowWidth - 20, windowWidth * (height / width));
    video.hide();
    const cnv = createCanvas(windowWidth - 20, windowWidth * (height / width));
    cnv.id('mycanvas');
    const saveBtn = createButton('save');
    saveBtn.position(0, windowWidth * (height / width) + 60);
    saveBtn.mousePressed(saveToFile);
    saveBtn.id('saveBtn');
};

const draw = () => {
    background(255);
    const gridSize = floor(windowWidth / 125);
    video.loadPixels();
    for (let y = 0; y < video.height; y += gridSize) {
        for (let x = 0; x < video.width; x += gridSize) {
            const index = (y * video.width - x) * 4;
            const [r, g, b] = video.pixels.slice(index, index + 3);
            const avg = floor((r + g + b) / 3);
            const ind = floor(map(avg, 0, 255, 0, density.length));
            const dia = floor(map(avg, 0, 255, gridSize, 0));
            fill(0);
            noStroke();
            textSize(gridSize);
            if (styleType === 0) {
                text(density.charAt(ind), x, y);
            } else if (styleType === 1) {
                circle(x + gridSize / 2, y + gridSize / 2, dia);
            } else {
                square(x + gridSize / 2, y + gridSize / 2, dia);
            }
        }
    }
};

function changeStyle(elem) {
    styleType = elem.value;
    console.log(styleType);
}
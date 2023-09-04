let video;

const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

function setup() {
    video = createCapture(VIDEO);
    let w = video.width;
    let h = video.height;
    video.size(windowWidth-20, windowWidth*(h/w));
    video.hide();
    let cnv = createCanvas(windowWidth-20, windowWidth*(h/w));
    cnv.id('mycanvas');
}

styleType = 0;
  
function draw() { 
    background(255);
    gridSize = 10;
    video.loadPixels();
    for (let y=0; y<video.height; y+=gridSize) {
      for (let x=0; x<video.width; x+=gridSize) {
        let index = (y * video.width - x) * 4;
        let r = video.pixels[index];
        let ind = floor(map(r, 0,255, 0, density.length));
        let dia = floor(map(r, 0,255, gridSize, 0));
        fill(0);
        noStroke();
        textSize(gridSize);
        if(styleType == 0){
            text(density.charAt(ind), x, y);
        }
        else if(styleType == 1){
            circle(x+gridSize/2,y+gridSize/2, dia);
        }
        else{
            square(x+gridSize/2,y+gridSize/2, dia);
        }
      }
    }
}

function changeStyle(elem){
    styleType = elem.value;
    console.log(styleType);
}

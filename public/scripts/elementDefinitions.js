import animations from './animations.js'
import element from './element.js'




/////////// static image//////////

var img = new Image();

img.src = "images/mid.png";

imgdraw();

function imgdraw(){
    ctx.drawImage(img,
  c.width / 2 - 500 / 2,
       c.height / 2 - 500/ 2,
       500, 500);
}



/////////////////// fire work //////////////////
//create

function createParticule(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = anime.random(16, 32);
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    //ctx.globalCompositeOperation='destination-over';
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  return p;
}

function createCircle(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = '#FFF';
  p.radius = 0.1;
  p.alpha = .5;
  p.lineWidth = 6;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  return p;
}

/////////// ripple /////////////

function createripple() {
    var currentColor = colorPicker.current();
    var nextColor = colorPicker.next();
    var targetR = calcPageFillRadius(pointerX, pointerY);
    var rippleSize = Math.min(200, (cW * .4));
    var minCoverDuration = 750;

    var pageFill = new Circle({
      x: pointerX,
      y: pointerY,
      r: 0,
      fill: nextColor
    });

    var ripple = new Circle({
      x: pointerX,
      y: pointerY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor
      },
      opacity: 1
    });

    var particles = [];
    for (var i=0; i<32; i++) {
      var particle = new Circle({
        x: pointerX,
        y: pointerY,
        fill: currentColor,
        r: anime.random(24, 48)
      })
      particles.push(particle);
    }
}

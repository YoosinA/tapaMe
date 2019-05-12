///////////// defs of each animation that can be used

import * as anis from './animations.js'
import anime from "../lib/anime.es.js";
// import element from './element.js'

var s = document.getElementById('svgSpace');
var svgns = "http://www.w3.org/2000/svg";

function updateCoords() {
  return {
    x : anime.random(20, 80),
    y: anime.random(10, 90)
  }
}

  var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

function createCircle(x, y){
  var cir = document.createElementNS(svgns, 'circle');
  cir.setAttribute('cx', x+'%');
        cir.setAttribute('cy', y+'%');
        cir.x = x;
        cir.y = y;
        // cir.setAttribute('r', anime.random(16, 32));
        cir.setAttribute('r', anime.random(6.7, 19));
        cir.setAttribute('fill', colors[anime.random(0, colors.length - 1)]);
  s.appendChild(cir);
  return cir;
}


var playground = document.getElementById('playground');

function createimg(img, x, y){
  var image = document.createElement('img');
  image.src = img;
  image.style.top = y + 'px';
  image.style.left = x + 'px';
  image.style.position = 'absolute';
  image.setAttribute('x', x);
  image.setAttribute('y', y);
  // image.x = x;
  // image.y = y;
  playground.appendChild(image);
  return image;

}

function animateParticules(color, img) {
  var coords = updateCoords();
  var numberOfParticules = 30;

      // var u = document.createElement('use');

       // <use clip-path="url(#myClip)" xlink:href="#heart" fill="red" />
  for (var i = 0; i < numberOfParticules; i++) {
    if (img == 0){
        var p = createCircle(coords.x, coords.y);
    } else {
      var x = coords.x / 100 * playground.offsetWidth /2.5;
      var y = coords.y / 100 * playground.offsetHeight /3;
      var p = createimg(img, x, y);
    }
    anis.radical(p);
  }
  return 0;
}

function drawCircle(color, img){
  //color = 'black';
  const cirWidth = 50;
  var cir = document.getElementById('drawCircle');


  console.log(cir);
  if (!cir){
      cir = document.createElementNS(svgns, 'path');
      cir.setAttribute("stroke-width", cirWidth);
      cir.setAttribute("transform-origin", "center");
      cir.id = 'drawCircle';
      s.appendChild(cir);
  }
  // center circle
  var cirx = playground.offsetWidth/2;
  var ciry = playground.offsetHeight/2;
  console.log(s);
  console.log(ciry);
  cir.setAttribute('d', 'M '+ cirx + ',' + ciry +
  ' m -175, 0 a 175,175 0 1,0 350,0  a 175,175 0 1,0 -350,0');
  s.removeChild(cir);
  s.appendChild(cir);
  return anis.tracePath(cir, color, -135)

}



function drawLines(){

}

function drawWave(){

}

function drawCross(){

}
function createEle(name) {
  switch(name) {
  case "firework":
    return animateParticules;
    break;
  case "circle":
  return drawCircle;
  break;
  // case y:
  //   // code block
  //   break;
  default:
    // code block
}
}

export { createEle };



// /////////// static image//////////
//
// var img = new Image();
//
// img.src = "images/mid.png";
//
// imgdraw();
//
// function imgdraw(){
//     ctx.drawImage(img,
//   c.width / 2 - 500 / 2,
//        c.height / 2 - 500/ 2,
//        500, 500);
// }
//
//
//
// /////////////////// fire work //////////////////
// //create
//
// function createParticule(x,y) {
//   var p = {};
//   p.x = x;
//   p.y = y;
//   p.color = colors[anime.random(0, colors.length - 1)];
//   p.radius = anime.random(16, 32);
//   p.endPos = setParticuleDirection(p);
//   p.draw = function() {
//     ctx.beginPath();
//     //ctx.globalCompositeOperation='destination-over';
//     ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
//     ctx.fillStyle = p.color;
//     ctx.fill();
//   }
//   return p;
// }
//
// function createCircle(x,y) {
//   var p = {};
//   p.x = x;
//   p.y = y;
//   p.color = '#FFF';
//   p.radius = 0.1;
//   p.alpha = .5;
//   p.lineWidth = 6;
//   p.draw = function() {
//     ctx.globalAlpha = p.alpha;
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
//     ctx.lineWidth = p.lineWidth;
//     ctx.strokeStyle = p.color;
//     ctx.stroke();
//     ctx.globalAlpha = 1;
//   }
//   return p;
// }
//
// /////////// ripple /////////////
//
// function createripple() {
//     var currentColor = colorPicker.current();
//     var nextColor = colorPicker.next();
//     var targetR = calcPageFillRadius(pointerX, pointerY);
//     var rippleSize = Math.min(200, (cW * .4));
//     var minCoverDuration = 750;
//
//     var pageFill = new Circle({
//       x: pointerX,
//       y: pointerY,
//       r: 0,
//       fill: nextColor
//     });
//
//     var ripple = new Circle({
//       x: pointerX,
//       y: pointerY,
//       r: 0,
//       fill: currentColor,
//       stroke: {
//         width: 3,
//         color: currentColor
//       },
//       opacity: 1
//     });
//
//     var particles = [];
//     for (var i=0; i<32; i++) {
//       var particle = new Circle({
//         x: pointerX,
//         y: pointerY,
//         fill: currentColor,
//         r: anime.random(24, 48)
//       })
//       particles.push(particle);
//     }
// }

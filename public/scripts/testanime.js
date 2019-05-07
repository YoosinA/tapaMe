import anime from "../lib/anime.es.js";

// function spin() { anime({
// translateX: 250,
// targets: 'div',
// rotate: '1turn',
// backgroundColor: '#FFF',
// duration: 8000
// });
// }	// duration: 8000

// <svg height="100" width="100">
//   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
// </svg>
//var d = document.getElementById("test");
var svgns = "http://www.w3.org/2000/svg";
var s = document.createElementNS(svgns, 'svg');
s.setAttribute('width', window.innerWidth);
s.setAttribute('height', window.innerHeight);

document.body.appendChild(s);


///////////////////////////////////////////////////////

// var c = document.getElementById("c");
// var ctx = c.getContext('2d');
//
// function setCanvasSize() {
//   c.width = window.innerWidth;
//   c.height = window.innerHeight;
// }
// setCanvasSize();
//  window.addEventListener('resize', setCanvasSize, false);
//
// var cH = c.height;
// var cW = c.width;

var cH = 500;
var cW = 500;


var numberOfParticules = 30;
var pointerX = 0;
var pointerY = 0;
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];



var bgColor = "#FF6138";
var animations = [];
var circles = [];

//////////////////////////////////////

// var img = new Image();
//
// img.src = "images/mid.png";
//
// imgdraw();





//////////////////////////////////////

// function imgdraw(){
//     ctx.drawImage(img,
//   cW / 2 - 500 / 2,
//        cH / 2 - 500/ 2,
//        500, 500);
// }



function updateCoords() {
  return {
    x : anime.random(0, cW),
    y: anime.random(0, cH)
  }
}

function setParticuleDirection(x,y) {
  var angle = anime.random(0, 360) * Math.PI / 180;
  var value = anime.random(50, 180);
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: x + radius * Math.cos(angle),
    y: y + radius * Math.sin(angle)
  }
}

function removesvg(k){
  //console.log('complete');

  //console.log(k);
  k.animatables[0].target.remove();
  //s.removeChild(k);
}

function createParticule(x,y) {
  var cir = document.createElementNS(svgns, 'circle');
  cir.setAttribute('cx', 100);
        cir.setAttribute('cy', 100);
        cir.setAttribute('r', anime.random(16, 32));
        cir.setAttribute('fill', colors[anime.random(0, colors.length - 1)]);
  s.appendChild(cir);

    var xx = setParticuleDirection(x, y);
    //console.log(xx);
  anime({
    targets: cir,
    translateX: [100, xx.x],
    translateY: [100, xx.y],

    easing: 'easeOutExpo',
    duration: 1200,
    complete: removesvg
  });
}

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
// function renderParticule(anim) {
//   for (var i = 0; i < anim.animatables.length; i++) {
//     anim.animatables[i].target.draw();
//   }
// }
//
// // function animateParticules(x, y) {
// //   var circle = createCircle(x, y);
// //   var particules = [];
// //   for (var i = 0; i < numberOfParticules; i++) {
// //     particules.push(createParticule(x, y));
// //   }
// //   anime.timeline().add({
// //     targets: particules,
// //     x: function(p) { return p.endPos.x; },
// //     y: function(p) { return p.endPos.y; },
// //     radius: 0.1,
// //     duration: anime.random(1200, 1800),
// //     easing: 'easeOutExpo',
// //     update: renderParticule
// //   })
// //     .add({
// //     targets: circle,
// //     radius: anime.random(80, 160),
// //     lineWidth: 0,
// //     alpha: {
// //       value: 0,
// //       easing: 'linear',
// //       duration: anime.random(600, 800),
// //     },
// //     duration: anime.random(1200, 1800),
// //     easing: 'easeOutExpo',
// //     update: renderParticule,
// //     offset: 0
// //   });
// // }
// //
// // var render = anime({
// //   duration: Infinity,
// //   update: function() {
// //   ctx.clearRect(0, 0, cW, cH);
// //   imgdraw();
// //   }
// // });
//
//
//
//
// /////////////////////////////////////////////// up firewor/////////////////
// //////////////////////down alexz/////////////////////////////////////////
//
//
// var colorPicker = (function() {
//   var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
//   var index = 0;
//   function next() {
//     index = index++ < colors.length-1 ? index : 0;
//     return colors[index];
//   }
//   function current() {
//     return colors[index]
//   }
//   return {
//     next: next,
//     current: current
//   }
// })();
//
// function removeAnimation(animation) {
//   var index = animations.indexOf(animation);
//   if (index > -1) animations.splice(index, 1);
// }
//
// function calcPageFillRadius(x, y) {
//   var l = Math.max(x - 0, cW - x);
//   var h = Math.max(y - 0, cH - y);
//   return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
// }
//
// function animateParticules(x, y) {
//   var circle = createCircle(x, y);
//   var particules = [];
//
//   // var path = anime.path('path');
//   //   var svgforpath = document.createElement('svg');
//   // var pathh = document.createElement('path');
//   // pathh.setAttribute('d','M150,0 L150,100 200,300 Z');
//   // svgforpath.appendChild(pathh);
//   // document.body.appendChild(svgforpath);
//
//   for (var i = 0; i < numberOfParticules; i++) {
//     var p = createParticule(x, y);
//     // particules.push(p);
//
//     // var panimation = anime({
//     //   targets: p,
//     //   x:  p.endPos.x,
//     //   y:  p.endPos.y,
//     //   translateX: 200,
//     //   translateY: 200,
//     //   backgroundColor: '#FFF',
//     //   duration: 8000,
//     //   //radius: 0.1,
//     //   //duration: anime.random(1200, 1800),
//     //   easing: 'easeOutExpo',
//     //   //update: renderParticule,
//     //   //complete: removeAnimation
//     // });
//
//   }
//
//
//   var cirlanimation = anime({
//     targets: circle,
//     radius: anime.random(80, 160),
//     lineWidth: 0,
//     alpha: {
//       value: 0,
//       easing: 'linear',
//       duration: anime.random(600, 800),
//     },
//     duration: anime.random(1200, 1800),
//     easing: 'easeOutExpo',
//     //update: renderParticule,
//     offset: 0,
//     complete: removeAnimation
//   });
//
//
//   // //animations.push(cirlanimation, paranimation);
//   // animations.push(cirlanimation);
//   // //anime.timeline().add(paranimation);
//   // anime.timeline().add(cirlanimation);
//
// }
//
// function handleEvent() {
//
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
//     var fillAnimation = anime({
//       targets: pageFill,
//       r: targetR,
//       duration:  Math.max(targetR / 2 , minCoverDuration ),
//       easing: "easeOutQuart",
//       complete: function(){
//         bgColor = pageFill.fill;
//         removeAnimation(fillAnimation);
//       }
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
//     var rippleAnimation = anime({
//       targets: ripple,
//       r: rippleSize,
//       opacity: 0,
//       easing: "easeOutExpo",
//       duration: 900,
//       complete: removeAnimation
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
//     var particlesAnimation = anime({
//       targets: particles,
//       x: function(particle){
//         return particle.x + anime.random(rippleSize, -rippleSize);
//       },
//       y: function(particle){
//         return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
//       },
//       r: 0,
//       easing: "easeOutExpo",
//       duration: anime.random(1000,1300),
//       complete: removeAnimation
//     });
//     animations.push(fillAnimation, rippleAnimation, particlesAnimation);
// }
//
// function extend(a, b){
//   for(var key in b) {
//     if(b.hasOwnProperty(key)) {
//       a[key] = b[key];
//     }
//   }
//   return a;
// }
//
// var Circle = function(opts) {
//   extend(this, opts);
// }
//
// Circle.prototype.draw = function() {
//   ctx.globalAlpha = this.opacity || 1;
//   ctx.beginPath();
//   ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
//   if (this.stroke) {
//     ctx.strokeStyle = this.stroke.color;
//     ctx.lineWidth = this.stroke.width;
//     ctx.stroke();
//   }
//   if (this.fill) {
//     ctx.fillStyle = this.fill;
//     ctx.fill();
//     imgdraw();
//   }
//   ctx.closePath();
//   ctx.globalAlpha = 1;
// }
//
// var animate = anime({
//   duration: Infinity,
//   update: function() {
//     ctx.fillStyle = bgColor;
//
//     ctx.fillRect(0, 0, cW, cH);
//     imgdraw();
//     animations.forEach(function(anim) {
//       anim.animatables.forEach(function(animatable) {
//         animatable.target.draw();
//       });
//     });
//   }
// });


function animateParticules(x, y) {
  //var circle = createCircle(x, y);
  // var particules = [];

  var coords = updateCoords();
  for (var i = 0; i < numberOfParticules; i++) {
    var p = createParticule(coords.x, coords.y);
  }

  // updateCoords();
  // // var path = anime.path('path');
  // //   var svgforpath = document.createElement('svg');
  // // var pathh = document.createElement('path');
  // // pathh.setAttribute('d','M150,0 L150,100 200,300 Z');
  // // svgforpath.appendChild(pathh);
  // // document.body.appendChild(svgforpath);
  //
  // for (var i = 0; i < numberOfParticules; i++) {
  //   var p = createParticule(x, y);
    // particules.push(p);

    // var panimation = anime({
    //   targets: p,
    //   x:  p.endPos.x,
    //   y:  p.endPos.y,
    //   translateX: 200,
    //   translateY: 200,
    //   backgroundColor: '#FFF',
    //   duration: 8000,
    //   //radius: 0.1,
    //   //duration: anime.random(1200, 1800),
    //   easing: 'easeOutExpo',
    //   //update: renderParticule,
    //   //complete: removeAnimation
    // });
}

document.addEventListener("keypress", function(e) {


    console.log(e.which);
  if (e.which > 104) {
    //handleEvent();
  } else {
    window.human = true;
    //render.play();

    animateParticules();

  }




}, false);

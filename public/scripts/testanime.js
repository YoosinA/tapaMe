//import '../styles/index.css';
import anime from "../lib/anime.es.js";



// anime({
// targets: 'div',
// translateX: 250,
// rotate: '1turn',
// backgroundColor: '#FFF',
// duration: 8000
// });




///////////////////////////////////////////////////////
window.human = false;

var c = document.getElementById("c");
var ctx = c.getContext('2d');

function setCanvasSize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  // c.style.width = window.innerWidth + 'px';
  // c.style.height = window.innerHeight + 'px';
  // c.getContext('2d').scale(2, 2);
}
setCanvasSize();
 window.addEventListener('resize', setCanvasSize, false);

//var ctx = c.getContext("2d");
var cH = c.height;
var cW = c.width;


var numberOfParticules = 30;
var pointerX = 0;
var pointerY = 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];



var bgColor = "#FF6138";
var animations = [];
var circles = [];

//////////////////////////////////////


//para.style.postion = "absolute";
       // Insert text


var img = new Image();

img.src = "images/mid.png";

imgdraw();





//////////////////////////////////////

// ctx.globalCompositeOperation='destination-over';

function imgdraw(){
    ctx.drawImage(img,
  c.width / 2 - 500 / 2,
       c.height / 2 - 500/ 2,
       500, 500);
}



function updateCoords(e) {
  pointerX = anime.random(0, c.width);
  pointerY = anime.random(0, c.height);
}

function setParticuleDirection(p) {
  var angle = anime.random(0, 360) * Math.PI / 180;
  var value = anime.random(50, 180);
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

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

function renderParticule(anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }
  anime.timeline().add({
    targets: particules,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
    targets: circle,
    radius: anime.random(80, 160),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: anime.random(600, 800),
    },
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule,
    offset: 0
  });
}

var render = anime({
  duration: Infinity,
  update: function() {
  ctx.clearRect(0, 0, c.width, c.height);
  //ctx.globalCompositeOperation = "source-over";
  imgdraw();
  }
});



var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

// function autoClick() {
//   if (window.human) return;
//   animateParticules(
//     anime.random(centerX-50, centerX+50),
//     anime.random(centerY-50, centerY+50)
//   );
  // anime({duration: 200}).finished.then(autoClick);
//}

//autoClick();


/////////////////////////////////////////////// up firewor/////////////////
//////////////////////down alexz/////////////////////////////////////////


var colorPicker = (function() {
  var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
  var index = 0;
  function next() {
    index = index++ < colors.length-1 ? index : 0;
    return colors[index];
  }
  function current() {
    return colors[index]
  }
  return {
    next: next,
    current: current
  }
})();

function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

// function addClickListeners() {
//   document.addEventListener("touchstart", handleEvent);
//   document.addEventListener("mousedown", handleEvent);
// };

function handleEvent() {
    // if (e.touches) {
    //   e.preventDefault();
    //   e = e.touches[0];
    // }


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
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration:  Math.max(targetR / 2 , minCoverDuration ),
      easing: "easeOutQuart",
      complete: function(){
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      }
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
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 900,
      complete: removeAnimation
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
    var particlesAnimation = anime({
      targets: particles,
      x: function(particle){
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function(particle){
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeAnimation
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b){
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var Circle = function(opts) {
  extend(this, opts);
}

Circle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    //ctx.globalCompositeOperation='destination-over';
    ctx.fillStyle = this.fill;
    ctx.fill();
    imgdraw();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
}

var animate = anime({
  duration: Infinity,
  //zIndex: -1000,
  update: function() {
    //ctx.globalCompositeOperation='destination-over';
    ctx.fillStyle = bgColor;

    ctx.fillRect(0, 0, cW, cH);
    imgdraw();
    animations.forEach(function(anim) {
      anim.animatables.forEach(function(animatable) {
        animatable.target.draw();
      });
    });
  }
});

// var resizeCanvas = function() {
//   cW = window.innerWidth;
//   cH = window.innerHeight;
//   //c.width = cW * devicePixelRatio;
//   //c.height = cH * devicePixelRatio;
//   //ctx.scale(devicePixelRatio, devicePixelRatio);
// };

(function init() {
  //resizeCanvas();
  if (window.CP) {
    // CodePen's loop detection was causin' problems
    // and I have no idea why, so...
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
  }
  //window.addEventListener("resize", resizeCanvas);
  // addClickListeners();
  // if (!!window.location.pathname.match(/fullcpgrid/)) {
  //   startFauxClicking();
  // }
  //handleInactiveUser();
})();

document.addEventListener("keypress", function(e) {

    updateCoords(e);
    //console.log(e.which);
  if (e.which > 104) {
    handleEvent();
  } else {
    window.human = true;
    render.play();

    animateParticules(pointerX, pointerY);

  }




}, false);

// function handleInactiveUser() {
//   var inactive = setTimeout(function(){
//     fauxClick(cW/2, cH/2);
//   }, 2000);

//   function clearInactiveTimeout() {
//     clearTimeout(inactive);
//     document.removeEventListener("mousedown", clearInactiveTimeout);
//     document.removeEventListener("touchstart", clearInactiveTimeout);
//   }
//
//   document.addEventListener("mousedown", clearInactiveTimeout);
//   document.addEventListener("touchstart", clearInactiveTimeout);
// }

// function startFauxClicking() {
//   setTimeout(function(){
//     fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
//     startFauxClicking();
//   }, anime.random(200, 900));
// }

// function fauxClick(x, y) {
//   var fauxClick = new Event("mousedown");
//   fauxClick.pageX = x;
//   fauxClick.pageY = y;
//   document.dispatchEvent(fauxClick);
// }

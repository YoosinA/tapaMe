//////////////def of movements/animations without animatables


/////////////

import anime from "../lib/anime.es.js";
//import shape from "./elementDefs.js"

// remove SVG shapes after animation completes
function removeSvgShape(k){
  //console.log(k);
  k.animatables[0].target.remove();
}



// set random directions
function setParticuleDirection(x,y) {
  var angle = anime.random(0, 360) * Math.PI / 180;
  var value = anime.random(50, 180);
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: x + radius * Math.cos(angle),
    y: y + radius * Math.sin(angle)
  }
}

// radiacally moving a list of targets from one center point to all directions
function radical(target, x, y){
    var xx = setParticuleDirection(target.x, target.y);
    var a = anime({
      targets: target,
      translateX: [target.x , xx.x],
      translateY: [target.y , xx.y],
      easing: 'easeOutExpo',
      duration: 1200,
      complete: removeSvgShape
    });
  }


  function tracePath(path, color, rotate) {
    var a = anime({
  targets: path,
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeOutBack',
  rotate: rotate,
 // easing: 'easeOutElastic',
  duration: 1500,
  begin: function(anim) {
    anim.animatables[0].target.setAttribute("stroke", color);
  },
//rotate: 180,
  complete: function(anim) {
    setTimeout(function() {
      anim.animatables[0].target.setAttribute("stroke", "");
    }, 500);
  }
});
return a;
}

  export {radical, tracePath};



// all bottom layer animations calls the onpresentbuttom callback function
// adding list to the array of the call back function

// function Expand
// function sizechange
// function moveup

// ///////globals /////////////////////////////
//
// var cH = c.height;
// var cW = c.width;
//
// var numberOfParticules = 30;
// var pointerX = 0;
// var pointerY = 0;
// var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
//
//
//
// var bgColor = "#FF6138";
// var animations = [];
// var circles = [];
//
// /// helpers //////////////////////////////////////
//
// function updateCoords(e) {
//   pointerX = anime.random(0, cH);
//   pointerY = anime.random(0, cW);
// }
//
// function setParticuleDirection(p) {
//   var angle = anime.random(0, 360) * Math.PI / 180;
//   var value = anime.random(50, 180);
//   var radius = [-1, 1][anime.random(0, 1)] * value;
//   return {
//     x: p.x + radius * Math.cos(angle),
//     y: p.y + radius * Math.sin(angle)
//   }
// }
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
// ////////////// firework ////////////////
//
//
//
// function renderParticule(anim) {
//   for (var i = 0; i < anim.animatables.length; i++) {
//     anim.animatables[i].target.draw();
//   }
// }
//
// function animateParticules(x, y) {
//   var circle = createCircle(x, y);
//   var particules = [];
//   for (var i = 0; i < numberOfParticules; i++) {
//     particules.push(createParticule(x, y));
//   }
//   var paranimation = anime({
//     targets: particules,
//     x: function(p) { return p.endPos.x; },
//     y: function(p) { return p.endPos.y; },
//     radius: 0.1,
//     duration: anime.random(1200, 1800),
//     easing: 'easeOutExpo',
//     update: renderParticule,
//     complete: removeAnimation
//   });
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
//     update: renderParticule,
//     offset: 0,
//     complete: removeAnimation
//   });
//
//
//   animations.push(cirlanimation, paranimation);
//   anime.timeline().add(paranimation);
//   anime.timeline().add(cirlanimation);
// }
//
//
// ///////////////////// background change ////////////////////
//
//
// function ripple() {
//
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
//
//     var rippleAnimation = anime({
//       targets: ripple,
//       r: rippleSize,
//       opacity: 0,
//       easing: "easeOutExpo",
//       duration: 900,
//       complete: removeAnimation
//     });
//
//
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


// anime({
//   targets: 'path',
//   strokeDashoffset: function(el) {
//     var pathLength = el.getTotalLength();
//     el.setAttribute('stroke-dasharray', pathLength);
//     return [-pathLength, 0];
//   },
//   stroke: {
//     value: function(el, i) {
//       return 'rgb(200,'+ i * 8 +',150)';
//     },
//     easing: 'linear',
//     duration: 2000,
//   },
//   strokeWidth: {
//     value: 6,
//     easing: 'linear',
//     delay: function(el, i) {
//       return 1200 + (i * 40);
//     },
//     duration: 800,
//   },
//   delay: function(el, i) {
//     return i * 60;
//   },
//   duration: 1200,
//   easing: 'easeOutExpo',
//   loop: true,
//   direction: 'alternate'
// });

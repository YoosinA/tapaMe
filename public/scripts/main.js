import control from "./controller.js"

var c = document.getElementById("c");
var ctx = c.getContext('2d');

function setCanvasSize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

//pass ctx and canvas h/w

setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);

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

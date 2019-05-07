// global properties and other stuff
import * as eles from "./elementDefs.js"
import * as ctrl from "./controller.js"

var s = document.getElementById('svgSpace');
/////////////// functions ////////////////////////
function setSVGSize() {
  s.setAttribute('width', window.innerWidth);
  s.setAttribute('height', window.innerHeight);
}

function toggleSidebar(){
  document.getElementById('toggleSidebar').classList.toggle('active');
  document.getElementById('sidebar').classList.toggle('active');

}

///////////// Init ///////////////////////////
setSVGSize();
window.addEventListener('resize', setSVGSize, false);
document.addEventListener("keypress", ctrl.onKeyPress, false);
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar, false);

ctrl.changeAniBinding(eles.animateParticules, 'a');

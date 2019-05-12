// global properties and other stuff
import * as ctrl from "./controller.js"

var s = document.getElementById('svgSpace');
var sidebar = document.getElementById('sidebar');
var playground = document.getElementById('playground');
/////////////// functions ////////////////////////

function toggleSidebar(){
  document.getElementById('toggleSidebar').classList.toggle('active');
  sidebar.classList.toggle('active');

}

function hideSidebar(){
  document.getElementById('toggleSidebar').classList.remove('active');
  sidebar.classList.remove('active');

}

function onDocumentDrag_noDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "none";
}

function onDocumentDrop_noDrop(event) {
  event.preventDefault();
  return false;
}


///////////// Init ///////////////////////////
document.addEventListener("keypress", ctrl.onKeyPress, false);
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar, false);
s.addEventListener('click', hideSidebar, false);
document.addEventListener('dragover', onDocumentDrag_noDrop, false);
document.addEventListener('drop', onDocumentDrop_noDrop, false);


/////////////// ctrl init /////////////////
ctrl.initChars();
document.getElementById('addNewCtrl').addEventListener('click', ctrl.addNewCtrl, false);

// sidebar.addEventListener('dragleave', onDocumentDrag, false);

// ctrl.changeAniBinding(97, eles.animateParticules);

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

function postCtrls(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:3000/saveShare', true);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      console.log(window.location.href + '?id=' +xhr.responseText);
    }
  };
  var s= JSON.stringify(ctrl.ctrls);
  console.log(s)
  xhr.send(s);
  //{"obj": JSON.stringify(ctrl.ctrls)}

}

///////////// Init ///////////////////////////
document.addEventListener("keydown", ctrl.onKeyPress, false);
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar, false);
s.addEventListener('click', hideSidebar, false);
document.addEventListener('dragover', onDocumentDrag_noDrop, false);
document.addEventListener('drop', onDocumentDrop_noDrop, false);

/////////////// ctrl init /////////////////
ctrl.initChars();
document.getElementById('addNewCtrl').addEventListener('click', ctrl.addNewCtrl, false);
document.getElementById('saveShare').addEventListener('click', postCtrls, false);

// sidebar.addEventListener('dragleave', onDocumentDrag, false);

// ctrl.changeAniBinding(97, eles.animateParticules);

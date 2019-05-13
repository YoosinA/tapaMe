// controller that handles filedrops/ binding key/ animation property, colors etc

//import elementDefs from "./elementDefinitions.js"

import * as ctrlView from "./controllerView.js"
import * as eles from "./elementDefs.js"
import * as randColor from "./randcolor.js"


// var animations = new Array(26);
// var imgs = new Array(26);
// animations.fill(0);
// imgs.fill(0);
var ctrls = new Array(26);
ctrls.fill(0);
var chars = new Array(26);



/////////////// functions ////////////////////////

function onKeyPress(e) {
  var key = e.which - 'A'.charCodeAt();
  var c = ctrls[key];
  if ( c != 0 ) {
    if (!c.eles){
      c.eles = c.ani(c.col, c.img);
    }
    // logic is a bit weird here, some ani don't have ele and is not silent,
    // some ani creates ani and is silent
    if (c.eles){
          c.eles.restart();
    }

  }
}

function initChars(){
  for ( var i= 0 ; i < 26; i ++){
    chars[i] = 25 - i;
  }
}

// function returnChar(c){
//   var l = chars.length;
//   var code = c.charCodeAt();
//   for (var i = l-1; i >= 0; i --){
//     if (chars[i] > code){
//         list.splice( i+1, 0, c);
//         break;
//     }
//   }
//   }

function onDocumentDrag(event) {
  event.preventDefault();
  // Set the dropEffect to move
  event.dataTransfer.dropEffect = "copy";
  event.stopPropagation();
  //ev.dataTransfer.dropEffect = "none";
}



function compress(img, ctrl) {
    const width = 40;
    const scaleFactor = width / img.width;

                const elem = document.createElement('canvas');
                elem.width = width;
                elem.height = img.height * scaleFactor;

                const ctx = elem.getContext('2d');
                // img.width and img.height will contain the original dimensions

                ctx.drawImage(img, 0, 0, width, elem.height) ;
                var url = 0;
                ctx.canvas.toBlob((blob) => {
                    var file = new File([blob], 's', {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    ctrl.img =  URL.createObjectURL(blob);

                }, 'image/png', 1);
}

function onDocumentDrop(event, target, ctrl) {
	event.preventDefault();

	var file = target.files[0];
	var reader = new FileReader();
  reader.readAsDataURL(file);

	reader.onload = function (event) {

		var image = document.createElement('img');
    image.src = event.target.result;
		image.onload = function () {

      // thumbnail. send to controller
    compress(image, ctrl);
    // ctrl.changeImgBinding(97, event.target.result);

		};
	};
}


function Ctrl(k, ctrl) {
  //reorder this to alphabetical order
  this.key = k,
  this.ctrl = ctrl.ctrl,
  this.img = 0,
  this.ani = 0,
  this.col = 'black',
  this.eles = 0,
  this.anitype = 0,
  this.init = function(ani, filechoose, color){

    this.ctrl.addEventListener('drop', (e) => {
      onDocumentDrop(e, event.dataTransfer, this);
    }, false);
    this.ctrl.addEventListener('dragover',  onDocumentDrag, false);

    ani.addEventListener('change', (e) => {
      this.anitype = e.target.value,
      this.ani = eles.createEle(e.target.value);
    }, false);
    this.ani = eles.createEle(ani.value);
    this.anitype = ani.value;

    filechoose.addEventListener('change', (e) => {
      onDocumentDrop(e, e.target, this);
    }, false);

    color.addEventListener('change',(e) => {
      this.col = e.target.value;
      if (this.eles){
        this.eles = 0;
      }
    }
  , false);
  }
}


function addNewCtrl(){
  var k = chars.pop();
  var ctrl = ctrlView.addNewCtrlView(String.fromCharCode(65+k));
  var newCtrl = new Ctrl(k, ctrl);
  newCtrl.init(ctrl.ani, ctrl.filechoose, ctrl.color);
  ctrls[k] = newCtrl;
}

// function changeKeyBindingControllerView(){}

// funciton onBindingChange(ani){
// changeAniBinding(this.key, ani);
// changeKeyBindingControllerView();
// }

function onOrderChange(){

}

function onColorChange(){
  //store
  // update current animation
}

function onRandColor(){
  randColor.newPalette(ctrls);
}

document.getElementById('randColor').addEventListener('click', onRandColor, false);


export { onKeyPress, addNewCtrl,  initChars };

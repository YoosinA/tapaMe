// controller that handles filedrops/ binding key/ animation property, colors etc

//import elementDefs from "./elementDefinitions.js"

//import ctrlView from "./controllerView.js"


var animations = new Array(26);
var imgs = new Array(26);
animations.fill(0);
imgs.fill(0);

/////////////// functions ////////////////////////
function setSVGSize() {
  svgSpace.width = window.innerWidth;
  svgSpace.height = window.innerHeight;
}

function onKeyPress(e) {
  var key = e.which - 'a'.charCodeAt();
  if (animations[key] != 0) {
      animations[key](imgs[key]);
    }
}

function changeAniBinding(key, ani){
  key = key - 'a'.charCodeAt();
  animations[key] = ani;
  // update ani's color/image/index
}

function changeImgBinding(key, img){
  key = key - 'a'.charCodeAt();
  imgs[key] = img;

  // update ani's color/image/index
}

// function changeKeyBindingControllerView(){}

// funciton onBindingChange(ani){
// changeAniBinding(this.key, ani);
// changeKeyBindingControllerView();
// }

function onOrderChange(){

}

function onImgChange(){

}

function onColorChange(){
  //store
  // update current animation
}

export { onKeyPress, setSVGSize, changeAniBinding, changeImgBinding };

// controller that handles filedrops/ binding key/ animation property, colors etc

//import elementDefs from "./elementDefinitions.js"

//import ctrlView from "./controllerView.js"


var animations = new Array(26);
animations.fill(0);

/////////////// functions ////////////////////////
function setSVGSize() {
  svgSpace.width = window.innerWidth;
  svgSpace.height = window.innerHeight;
}

function onKeyPress(e) {
  var key = e.which - 'a';
  if (animations[key] != 0) {
    animations[key]();
  }
}

function changeAniBinding(ani, key){
  key = key - 'a';
  animations[key] = ani;
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

export { onKeyPress, setSVGSize, changeAniBinding };

// import * as ani from 'animation';

// separate this to sidebar controller file, will have side bar view file

$('#sidebarCollapse').on('click', function () {
  $('#navb').toggleClass('active');
  $('#sidebarCollapse').toggleClass('active');
});

// put this
$(document).ready(function () {
  function dragover_handler(ev) {
    ev.preventDefault();
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "move"
}
  function drop_handler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
  }
});

// var cirController = new ExpandCircle("images/mid.png");

// var raster = new Raster("images/mid.png");
// raster.visible = false;

// var img = null;
// var circles = [];

document.addEventListener('keydown', function(event) {
  //var raster = new Raster(img);
  x = Math.random() * 500;
  y = Math.random() * 500;
  console.log("center at " + x);
  var circle = new Path.Circle({
  center: [x, y],
  radius: 10,
  strokeColor: 'black'
  });
var rat = new Raster(img);
rat.visible = true;
rat.size = new Size(200, 200);
rat.position = [x, y];


  // Create a group of the two items and clip it:
  var group = new Group(circle, rat);
  group.clipped = true;
  // console.log(JSON.stringify(group));

  //path.clipMask = true
  // group.on('circleDone',function(event) {
  //   this.remove();
  // });
  group.onFrame = function(event) {

    if (this.opacity <= 0){
      paper.view.detach('frame', this.onFrame);
      this.remove();
    } else {
      //this.radius -= 1;
      // this.clipped = false;
      // // this.circle.radius -= 5;
      // this.clipped = true;
      // this.scale(0.95);
      //this.opacity -= 0.02;
    }

  };

  circle.onFrame = function(event){
    // var offset = Math.sin(event.count / 30) * 10;
    // this.position.x = this.position.x + offset;
    if (this.area <= 6000){
      this.scale(1.03);

    // } else if (this.opacity <= 0){
    //   paper.view.detach('frame', this.onFrame);
    //   this.remove();
    } else {
      // this.dispatchEvent( new CustomEvent ( 'circleDone', {
      //   bubbles: true
      // }));
      //paper.view.detach('frame', this.onFrame);
      //this.remove();
    }

  };

}, false);


function onDocumentDrag(event) {
event.preventDefault();
}

function onDocumentDrop(event) {
	event.preventDefault();

	var file = event.dataTransfer.files[0];
	var reader = new FileReader();

	reader.onload = function (event) {
		var image = document.createElement('img');
		image.onload = function () {
      img = image;
			raster = new Raster(image);
			raster.visible = false;
		};
		image.src = event.target.result;
	};
	reader.readAsDataURL(file);
}

document.addEventListener('drop', onDocumentDrop, false);
document.addEventListener('dragover', onDocumentDrag, false);
document.addEventListener('dragleave', onDocumentDrag, false);





// Move the active layer to the center of the view:
project.activeLayer.position = view.center;

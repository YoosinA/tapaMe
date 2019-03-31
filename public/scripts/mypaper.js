$(document).ready(function () {

$('#sidebarCollapse').on('click', function () {
  $('#sidebar').toggleClass('active');
});

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
  // Create a Paper.js Path to draw a line into it:
  var path = new Path();
  // Give the stroke a color
  path.strokeColor = 'black';
  var start = new Point(100, 100);
  // Move to start and draw a line from there
  path.moveTo(start);
  // Note the plus operator on Point objects.
  // PaperScript does that for us, and much more!
  path.lineTo(start + [ 100, -50 ]);

  console.log(view.element.toDataURL('image/png').substring(0, 32));


// The size of our grid cells:
var gridSize = 12;

// Space the cells by 120%:
var spacing = 1.9;
var oldpath = [];
var temppath = [];

// As the web is asynchronous, we need to wait for the raster to load
// before we can perform any operation on its pixels.


function onDocumentDrag(event) {
event.preventDefault();
}

function onDocumentDrop(event) {
event.preventDefault();

var file = event.dataTransfer.files[0];
var reader = new FileReader();

reader.onload = function (event) {
var image = document.createElement('img');
image.hidden= true;
console.log("new image");
image.onload = function () {
for (var y = 0; y < oldpath.length; y++) {
  //console.log("deleting");
  var p = oldpath[y];
  p.remove();
}
var raster = new Raster(image);
spacing = 2.5;
raster.size = new Size(40, 30);
//raster.visible = false;

  raster.on('frame', function() {
    // if (attach == 0){
    //   paper.view.attach('frame', this.onFrame);
    //   attach = 1;
    // }

    // Since the example image we're using is much too large,
    // and therefore has way too many pixels, lets downsize it to
    // 40 pixels wide and 30 pixels high:
    if (spacing <= 1.6) {
      temppath = oldpath.slice(0,1200);
      oldpath = oldpath.slice(1200,-1);

      for (var y = 0; y < temppath.length; y++) {
        //console.log("deleting");
        var p = temppath[y];
        p.remove();
      }
      temppath =[];
      spacing -= 0.14;
    }

    if (spacing <= 0.7){
      console.log("stoppppp");
      paper.view.detach('frame', this.onFrame);
      //console.log("fine");
      this.remove();
      //oldpath = [];
    }
    if (spacing > 1){


      for (var y = 0; y < raster.height; y++) {
        for(var x = 0; x < raster.width; x++) {
          // Get the color of the pixel:
          var color = raster.getPixel(x, y);

          // Create a circle shaped path:
          var path = new Path.Circle({
            center: new Point(x, y) * gridSize,
            radius: gridSize / 2 / spacing
          });

          // Set the fill color of the path to the color
          // of the pixel:
          path.fillColor = color;
          oldpath.push(path);
        }
      }
      spacing -= 0.05;
      // Move the active layer to the center of the view, so all
      // the created paths in it appear centered.
      project.activeLayer.position = view.center;
    }
  });
//paper.view.attach('frame', raster.onFrame);
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

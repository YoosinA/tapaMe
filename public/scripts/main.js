// global properties and other stuff
import * as eles from "./elementDefs.js"
import * as ctrl from "./controller.js"

var s = document.getElementById('svgSpace');
var sidebar = document.getElementById('sidebar');
var playground = document.getElementById('playground');
/////////////// functions ////////////////////////

function toggleSidebar(){
  document.getElementById('toggleSidebar').classList.toggle('active');
  document.getElementById('sidebar').classList.toggle('active');

}

function onDocumentDrag_noDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "none";
}

function onDocumentDrop_noDrop(event) {
  event.preventDefault();
  return false;
}


function onDocumentDrag(event) {
  event.preventDefault();
  // Set the dropEffect to move
  event.dataTransfer.dropEffect = "copy";
  event.stopPropagation();
  //ev.dataTransfer.dropEffect = "none";
}



function compress(img) {
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
                    ctrl.changeImgBinding(97, URL.createObjectURL(blob));

                }, 'image/png', 1);

  return url;
}

function onDocumentDrop(event) {
	event.preventDefault();

	var file = event.dataTransfer.files[0];
	var reader = new FileReader();
  reader.readAsDataURL(file);

	reader.onload = function (event) {

		var image = document.createElement('img');
    image.src = event.target.result;
		image.onload = function () {

      // thumbnail. send to controller
    compress(image);
    // ctrl.changeImgBinding(97, event.target.result);

		};
	};

}

///////////// Init ///////////////////////////
document.addEventListener("keypress", ctrl.onKeyPress, false);
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar, false);
document.addEventListener('dragover', onDocumentDrag_noDrop, false);
document.addEventListener('drop', onDocumentDrop_noDrop, false);
sidebar.addEventListener('drop', onDocumentDrop, false);
sidebar.addEventListener('dragover', onDocumentDrag, false);
// sidebar.addEventListener('dragleave', onDocumentDrag, false);

ctrl.changeAniBinding(97, eles.animateParticules);

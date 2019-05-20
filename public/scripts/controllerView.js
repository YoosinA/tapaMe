// update the view of the controller

var s = document.getElementById('sidebar');
const aniNames = ["firework", "circle"];

function adddropdown(parent, savedAni){
  aniNames.forEach(function(a) {
    var o = document.createElement('option');
    o.value = a;
    o.text = a;
    parent.appendChild(o);
})
// giving the select a random default value
if (savedAni){
  parent.value = savedAni;
} else {
  parent.value = aniNames[Math.floor(Math.random()*aniNames.length)];
}
}


function addNewCtrlView(k, savedAni){
  var ctrl = document.createElement('form');
  ctrl.action = "";
  ctrl.classList.add('ctrl');
  var key = document.createElement('label');
  key.innerHTML =  k + ':  ';
  ctrl.appendChild(key);
  var ani = document.createElement('select');
  adddropdown(ani, savedAni);
  ctrl.appendChild(ani);
   var filechoose = document.createElement('input');
   filechoose.type = 'file';
   filechoose.name = 'Choose Image';
   filechoose.classList.add("form-control-file");
   ctrl.appendChild(filechoose);
  s.appendChild(ctrl);
     var color = document.createElement('input');
        color.type = 'color';
        // color.val = savedCol;
           ctrl.appendChild(color);
             s.appendChild(ctrl);
  return {ctrl, ani, filechoose, color};
}

//imgthumbnail

export {addNewCtrlView};

// <form action="" method="get" class="form-example">
//   <div class="form-example">
//     <label for="name">Enter your name: </label>
//     <input type="text" name="name" id="name" required>
//   </div>
//   <div class="form-example">
//     <label for="email">Enter your email: </label>
//     <input type="email" name="email" id="email" required>
//   </div>
//   <div class="form-example">
//     <input type="submit" value="Subscribe!">
//   </div>
// </form>




//switchs : animation type (drop down?), list of file (one file for now)(drop zone?), forground/background (iphone green button),
// key (max / defualt 26), with a plus button, that adds next avail key with +, delete button, color......? button: choosefile/colorToRgb

// display
// + // v edit keys:              O +
// O // v A: circle  file1.jpg      x
// O // v A: circle  file1.jpg      x
// O // v A: circle  file1.jpg      x
// O // ^ A: circle  file1.jpg      x  < |
//   // v   | anity|  |      |    O |
//   // v   |      |  |      |      |
//   // v   |      |  |      |      |
//   // v A: circle  file1.jpg      x


// rand color
//   <> all elements/empty
//   <> no/yes generate new rand color
//   color number []
//   O color 1
//   O color 2
/// drop down to edit each control

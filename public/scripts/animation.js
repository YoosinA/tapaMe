export 
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
    if (this.area <= 4000){
      this.scale(1.03);

    // } else if (this.opacity <= 0){
    //   paper.view.detach('frame', this.onFrame);
    //   this.remove();
    } else {
      paper.view.detach('frame', this.onFrame);
      this.remove();
    }

  };

}, false);

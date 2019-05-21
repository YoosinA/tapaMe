import anime from "../lib/anime.es.js";
import * as eles from "./elementDefs.js"

var url = "https://colormind.io/api/";
var palette = [];
var data = {
	model : "default"
	// input : [[44,43,44],[90,83,82],"N","N","N"]
}

function newPalette(ctrls, input){
  var http = new XMLHttpRequest();

  http.onreadystatechange = function() {
  	if(http.readyState == 4 && http.status == 200) {
      var result =  JSON.parse(http.responseText).result;
      console.log(result);
      palette = [];
      result.forEach(function(e) {
        palette.push("rgb(" +  e[0] + ","
                + e[1] + ","
                + e[2] + ")");
              });
      // should move this part to controller.js, using async
      ctrls.forEach(function (e){
        if (e){

          console.log(e.col)
          if (e.anitype == "firework" ){
            e.col = palette;
          } else {
            e.col = [palette[anime.random(0, 4)]];
          }
          e.eles = 0;
        }

      });
      // palette = "rgb(" +  rgbvalue.R + ","
      //         + rgbvalue.G + ","
      //         + rgbvalue.B + ")"
  	}
  }

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
}


export {newPalette, palette};

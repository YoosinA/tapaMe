import anime from "../lib/anime.es.js";
import * as eles from "./elementDefs.js"

var palette = [];

function newPalette(ctrls, input){
	var xhr = new XMLHttpRequest();
  xhr.open("GET", window.location.href + 'palette', true);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
			console.log(xhr.responseText);
			var result =  JSON.parse(xhr.responseText).result;
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
    }
  };
  xhr.send(null);
  //{"obj": JSON.stringify(ctrl.ctrls)}
}

export {newPalette, palette};


var url = "http://colormind.io/api/";
var palette = [];
var data = {
	model : "default"
	// input : [[44,43,44],[90,83,82],"N","N","N"]
}

function newPalette(input){
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
      // palette = "rgb(" +  rgbvalue.R + ","
      //         + rgbvalue.G + ","
      //         + rgbvalue.B + ")"
  	}
  }

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
}


export {newPalette, palette};

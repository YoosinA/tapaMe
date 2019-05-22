var express = require("express");
var app = express();
var bodyPaser = require("body-parser");
var path = require("path");
var anime = require("animejs");
var mongoose = require("mongoose");
const request = require('request');

app.set('view engine', 'ejs');

mongoose.connect("mongodb://heroku_p9dd835l:qahtrv3pal5ms54p2oj3q6pdve@ds259596.mlab.com:59596/heroku_p9dd835l", { useNewUrlParser: true });
app.use(bodyPaser.urlencoded({extended: true}));
app.use(bodyPaser.json());

var thingSchema = new mongoose.Schema({}, { strict: false });
var Thing = mongoose.model('Thing', thingSchema);

app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req, res)=>{

  //res.render("newindex");
  var savedCtrls = 0;
  if (req.query.id) {
    var ctrl = Thing.find({"_id":  req.query.id },
    function(err, thing){
      if (err || !thing){
        console.log(err);
      } else {
        savedCtrls = JSON.stringify(thing);
      }
        res.render(__dirname + '/myindex.ejs', {savedCtrls: savedCtrls});
    });
  } else {
    res.render(__dirname + '/myindex.ejs', {savedCtrls: savedCtrls});
  }
});


app.post("/saveShare", (req, res) => {
//console.log(req)
   //res.send("here");
   var obj = req.body;
   var thing = new Thing({"ctrl": obj});
   thing.save(function(err, savedobj){
     if (err){
       console.log("err");
     } else {
       console.log("obj saved");
       res.send(savedobj._id.toString());
     }
   });
});

app.get("/palette", (req, res) => {
  var url = "http://colormind.io/api/";
  var data = JSON.stringify({
    model : "default"
    // input : [[44,43,44],[90,83,82],"N","N","N"]
  })

request.post({
    url: url,
    body: data
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body);
    }
});

});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,  ()=> {
  console.log("server started!");
});

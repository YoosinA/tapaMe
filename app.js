var express = require("express");
var app = express();
var bodyPaser = require("body-parser");
var path = require("path");
var anime = require("animejs");
var mongoose = require("mongoose");
app.set('view engine', 'ejs');

mongoose.connect("mongodb://heroku_p9dd835l:qahtrv3pal5ms54p2oj3q6pdve@ds259596.mlab.com:59596/heroku_p9dd835l", { useNewUrlParser: true });
app.use(bodyPaser.urlencoded({extended: true}));
app.use(bodyPaser.json());

// var objSchema = new mongoose.Schema({
//   name: String
// })

// var Cat = mongoose.model("Cat", catSchema);
//
// var c = new Cat({
//   name: "mewmew",
//   ctrl: 3
// }, function(err, cat){
//   if (err){
//     console.log("err");
//   } else {
//     console.log("it works");
//     console.log(cat);
//   })
//
// Cat.find({}, function(err, cats){
//   if (err){
//     console.log(err);
//   }else {
//     console.log(cats);
//   }
// })
// var myJSON = JSON.stringify(obj);

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

  // res.redirect("/saveShare");
});

// app.get('/category', function(req, res) {
//   var string = encodeURIComponent('something that would break');
//   res.redirect('/?valid=' + string);
// });
// You can snag that in your other route by getting the parameters sent by using req.query.
//
// app.get('/', function(req, res) {
//   var passedVariable = req.query.valid;
//   // Do something with variable
// });
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,  ()=> {
  console.log("server started!");
});

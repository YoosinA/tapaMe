var express = require("express");
var app = express();
var bodyPaser = require("body-parser");
var path = require("path");
var anime = require("animejs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
app.use(bodyPaser.urlencoded({extended: true}));
// var catSchema = new mongoose.Schema({
//   name: String,
//   ctrl: Number
// })
//
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

app.use(bodyPaser.urlencoded({extended: true}));
//app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req, res)=>{

  //res.render("newindex");
  res.sendFile(__dirname + '/myindex.html')
});

app.post("/saveShare", (req, res) => {
  console.log(req.body);
  // res.send("here");
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

app.listen(3000,  ()=> {
  console.log("server started!");
});

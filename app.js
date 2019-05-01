var express = require("express");
var app = express();
var bodyPaser = require("body-parser");
var path = require("path");

app.use(bodyPaser.urlencoded({extended: true}));
//app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req, res)=>{

  //res.render("newindex");
  res.sendfile('myindex.html')
});

app.listen(3000,  ()=> {
  console.log("server started!");
});

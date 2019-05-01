var express = require("express");
var app = express();
var bodyPaser = require("body-parser");

app.use(bodyPaser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res)=>{

  res.render("newindex");
});

app.listen(3000,  ()=> {
  console.log("server started!");
});

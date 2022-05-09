const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/nepalDB");

const contactSchema = {
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String
}

const Contact = new mongoose.model("Contact", contactSchema);

app.get("/", function(req, res){
  res.render("index");
});

app.get("/recrutare", function(req, res){
  res.render("recrutare");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.post("/contact", function(req, res){
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message
  });
  newContact.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("index");
    }
  })
})


app.listen(3000, function(){
  console.log("Server is running on 3000");
});

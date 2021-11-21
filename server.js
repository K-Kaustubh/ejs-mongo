const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const fileUpload = require("express-fileupload");
app.use(fileUpload());

mongoose.connect(
  "mongodb+srv://Kaustubh:nikku123@cluster0.w2sbf.mongodb.net/userdata?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

// Users Schema

const usersSchema = {
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  Course: String,
  image: String,
  age: Number,
};

const User = mongoose.model("User", usersSchema);

app.get("/", function (req, res) {
  User.find({}, function (err, users) {
    res.render("index", {
      usersList: users,
    });
  });
});

app.get("/users", function (req, res) {
  res.render("users");
});

app.post("/users", function (req, res) {
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    Course: req.body.Course,
    age: req.body.age,
  });
  newUser.save();
  res.redirect("/");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server listening on port 5000");
});

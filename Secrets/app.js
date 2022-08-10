//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encryp = require("mongoose-encryption");

mongoose.connect("mongodb://localhost:27017/userInfo")

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(encryp, { secret: process.env.SECRET, encryptedFields: ["password"] });

const userInfos = new mongoose.model("userInfo", userSchema);

app.get("/", function (req, res) {
    res.render("home")
});

app.get("/login", function (req, res) {
    res.render("login")
});

app.get("/register", function (req, res) {
    res.render("register")
});

app.post("/register", function (req, res) {
    const userinfo = new userInfos({
        email: req.body.username,
        password: req.body.password
    })
    userinfo.save();
    res.render("secrets")
})

app.post("/login", function (req, res) {
    const userEmail = req.body.username;
    const password = req.body.password;
    userInfos.findOne({ email: userEmail }, function (err, foundinfo) {
        if (err) {
            res.send(err);
        } else {
            if (foundinfo.password === password) {
                res.render("secrets");
            } else {
                res.send("wrong userinfo! please check you input!")
            }
        }
    })
})

app.listen(3000, function () {
    console.log("Server is listening at 3000!");
});
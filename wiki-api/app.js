const express = require("express");
const mongoose = require("mongoose");
const bodyPareser = require("body-parser");
const ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB");

const app = express();
app.set("view engine", ejs);
app.use(bodyPareser.urlencoded({ extended: true }));
app.use(express.static("public"));

const articleSchema = {
    title: String,
    content: String
}

const articles = mongoose.model("articles", articleSchema);

app.route("/articles")
    .get(function (req, res) {
        articles.find(function (err, foundArticles) {
            if (err) {
                console.log(err);
            } else {
                res.send(foundArticles);
            }
        })

    })
    .post(function (req, res) {
        const title = req.body.title;
        const content = req.body.content;
        const article = {
            title: title,
            content: content
        }
        articles.insertMany(article, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("successed!")
            }

        })
    })
    .delete(function (req, res) {
        Atomics.deleteAll(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles!")
            } else {
                res.send(err);
            }
        })
    });


app.route("/articles/:articleTitle")
    .get(function (req, res) {
        articles.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            if (err) {
                res.send(err);
            } else {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("No article is found!");
                }

            }
        })
    })
    .put(function (req, res) {
        articles.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            function (err) {
                if (!err) {

                    res.send("Article is updated successfully!");
                }
                else { res.send(err); }
            })
    })
    .patch(function (req, res) {
        articles.findOneAndUpdate({ title: req.params.articleTitle }, { $set: req.body }, function (err) {
            if (!err) {
                res.send("patch is successful!");
            } else {
                res.send(err);
            }

        })
    })
    .delete(function (req, res) {
        articles.deleteOne({ title: req.params.articleTitle }, function (err) {
            if (!err) {
                res.send("Delete article is successful!")
            } else {
                res.send(err);
            }
        })
    })





app.listen(3000, function () {
    console.log("Server started on port 3000");
})
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const _ = require("lodash");

// mongoose.connect("mongodb://localhost:27017/todolist");
mongoose.connect(`mongodb+srv://admin-can:${process.env.SECRET}@cluster0.fq1pe99.mongodb.net/todolist`);

const toDoListsSchema = new mongoose.Schema({
    name: String
})

const listSchema = new mongoose.Schema({
    name: String,
    list: [toDoListsSchema]
})

const toDoLists = mongoose.model("toDoLists", toDoListsSchema)
const lists = mongoose.model("lists", listSchema)

const list1 = new toDoLists({
    name: "homework"
});

const list2 = new toDoLists({
    name: "eat"
});

const list3 = new toDoLists({
    name: "cook"
});

const defaultlist = [list1, list2, list3];

toDoLists.countDocuments({}, function (err, count) {
    if (err) { console.log(err); }
    else {
        if (count === 0) {
            toDoLists.insertMany(defaultlist, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Inset default items successful!");
                }
            });
        } else {
            console.log("the count is " + count);
        }
    }

});

const app = express();
let items = [];
let workItems = [];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let today = new Date();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
}
let day = today.toLocaleDateString("en-US", options);


app.get("/", function (req, res) {

    toDoLists.find(function (err, todolists) {
        if (err) {
            console.log(err);
        } else {
            res.render('list', { listTitle: day, newItems: todolists });
        }

    });

})

app.get("/:customerPage", function (req, res) {
    const listname = _.capitalize(req.params.customerPage);
    console.log(listname);


    lists.findOne({ name: listname }, function (err, result) {
        if (!result) {
            console.log("result is null");
            const lists1 = new lists(
                {
                    name: listname,
                    list: defaultlist
                }
            )
            lists1.save();
        } else {
            console.log("the working list is " + result.name);
            res.render("list", { listTitle: result.name, newItems: result.list })
        }
    })
})

app.post("/", function (req, res) {
    const newItem = req.body.newItem;
    const title = req.body.button;
    console.log("the title is " + title);
    let newList = new toDoLists({
        name: newItem
    })

    if (title === day) {
        newList.save();
        res.redirect("/");
    } else {
        lists.findOne({ name: title }, function (err, foundList) {
            // console.log(foundList);
            foundList.list.push(newList);
            foundList.save();
            res.redirect("/" + title);
        })
    }


})

app.post("/delete", function (req, res) {
    const listName = req.body.listName;
    const listId = req.body.checkbox;

    if (listName === day) {
        toDoLists.deleteOne({ _id: listId }, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("delete successful! the ID is " + listId);
            }
        });
        res.redirect("/");
    } else {
        lists.findOneAndUpdate({ name: listName }, { $pull: { list: { _id: listId } } }, function (err, result) {
            if (!err) {
                console.log(result);
                res.redirect("/" + listName);
            }
        })
    }
})



app.listen(3000, function () {
    console.log("Server started on port 3000");
})
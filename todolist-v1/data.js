const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
})

// fruit.save();

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 4,
    review: "Pretty solid as a fruit."
})

const banana = new Fruit({
    name: "Banana",
    rating: 7,
    review: "Pretty solid as a fruit."
})

const orange = new Fruit({
    name: "Orange",
    rating: 7,
    review: "Pretty solid as a fruit."
})

// Fruit.insertMany([kiwi, banana, orange]);

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close()
        for (let i = 0; i < fruits.length; i++) {
            fruits.forEach(function (fruit) {
                console.log(fruit.name);
            })
        }
    }
})
// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { name } = require('ejs');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const Item1 = new Item({
    name: "This is the first List"
})
const Item2 = new Item({
    name: "This is the second List"
})
const Item3 = new Item({
    name: "This is the third List"
}
)
const defaultItems = [Item1,Item2,Item3];

Item.insertMany(defaultItems)
let items = ["Buy Food", "Cook Food", "Eat Food"];

// Define a simple route
app.get('/', (req, res) => {
let today = new Date();
//let currentDay = today.getDay();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
let day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, todos: items});
});


// Post route to handle request from list.ejs
app.post('/', (req, res) => {
    const newItem = req.body.newitem;
    console.log(newItem);
    items.push(newItem);
    res.redirect('/');
});
// Listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
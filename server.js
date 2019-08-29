const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");


app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname, "views/partials"));

app.get("/", (req, res) => {
    res.render("index");
});

// hardcoded variables, used for demo purpose
const users = [ // fake datatbase
    {name: "Jill", id: 1}, // index 0
    {name: "Bill", id: 2}, // index 1
    {name: "Will", id: 3}  // index 2
];


app.get("/users", (req, res) => {
    res.render("users", {users});
});

app.get("/users/:id", (req, res) => {
    // console.log(req.params);
    // res.send("ok");
    
    console.log(req.params.id);
    
    const foundUser = users.filter(user => 
        user.id === Number(req.params.id))[0]; // 0 to access first index
        // of the returned array (filter always returns an array)
        //use Number() because the req.params.id is a string
    res.render("users_details", {
        user: foundUser
    });
});

const listener = app.listen(4000, ()=> {
    console.log(`server is up @ http://localhost: ${listener.address().port}`);
});

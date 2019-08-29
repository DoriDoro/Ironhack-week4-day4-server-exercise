const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

// new configuration line :
app.use(express.urlencoded({ extended : true}));
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
    console.log(req.query); // empty object on the console -> {}
    // e.g http://localhost:4000/users?name=toto&age=10&email=toto@gmail.com
    // console: {name: 'toto', age: '10', email: 'toto@gmail.com'}
    
    res.render("users", {users});
});

app.get("/users/:id", (req, res) => {
    // console.log(req.params);
    // res.send("ok");
    
    // console.log(req.params.id);
    
    const foundUser = users.filter(user => 
        user.id === Number(req.params.id))[0]; // 0 to access first index
        // of the returned array (filter always returns an array)
        //use Number() because the req.params.id is a string
    res.render("users_details", {
        user: foundUser
    });
});

app.get("/find-user", (req, res) => {
    // console.log(req.query);
    // res.send("@toto: find matching user by name");
    // just one res.send or res.render because the browser can not make 2 
    // response at the same time; one req one res
    const foundUser = users.filter(user => user.name.toLowerCase() === req.query.name.toLowerCase())[0];
    res.render("user_find", {user: foundUser});
});


// step 1 : serve the create user view:
app.get("/create-user", (req, res) => {
    res.render("user_create");
});

// step 2: process form submission:
app.post("/user", (req, res) => {
    console.log(req.body);
   // res.send("@toto : add new user");
    var msg;
    if(req.body.name !== "") {
        users.push({name: req.body.name, id: users.length + 1});
        msg = "user successfully created!"
    } else {
        msg = "please fill name field !";
    }
    res.render("user_create", {msg});
});



const listener = app.listen(4000, ()=> {
    console.log(`server is up @ http://localhost: ${listener.address().port}`);
});

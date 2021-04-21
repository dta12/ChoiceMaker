const mysql = require("mysql")
const express = require("express")
const app = express()
const path = require("path")
const session = require('express-session');
const bodyParser = require('body-parser');
const port = 8000

var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'functions')));
app.use(express.static(path.join(__dirname, 'stylesheets')));




app.set("view engine", "html")
app.get("/", function(req, res) {
    res.sendFile("/pages/home.html", { root: __dirname })
})
app.post("/factors", function(req, res) {
    res.sendFile("/pages/factors.html", { root: __dirname })
})
app.post("/results", function(req, res) {
    if (req.session.loggedin == true) {
        res.sendFile("/pages/finalloggedin.html", { root: __dirname })
    } else {
        res.sendFile("/pages/final.html", { root: __dirname })
    }
})
app.get("/login", function(req, res) {
    res.sendFile("/pages/login.html", { root: __dirname })
})
app.get("/login/again", function(req, res) {
    res.sendFile("/pages/again.html", { root: __dirname })
})

app.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/loggedin');
            } else {
                res.redirect("/login/again")
            }
            res.end();
        });
    }
});

app.get("/about", function(req, res) {
    res.sendFile("/pages/about.html", { root: __dirname })
})
app.get("/accountsettings", function(req, res) {
    res.sendFile("/pages/profile.html", { root: __dirname })
})
app.get("/signup", function(req, res) {
    res.sendFile("/pages/create.html", { root: __dirname })
})
app.post('/createaccount', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    var region = req.body.region;
    var sql = "INSERT INTO `accounts` (`name`, `username`, `email`, `password`, `region`)VALUES ?"
    var values = [
        [name, username, email, password, region]
    ]
    connection.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect("/loggedin")
    });
})
app.get("/loggedin", function(req, res) {
    res.sendFile("/pages/loggedin.html", { root: __dirname })
})
app.listen(port, () => console.log("running..."))

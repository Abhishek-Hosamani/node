var mysql = require("mysql");
var express = require("express");
var app = express();

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'college'
});

con.connect((err) => {
    if (!err) console.log("DB connected");
    else console.log("Error");
})


app.listen(7000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/register.html");
})


app.post('/', (req, res) => {

    // console.log(name);
});

app.get('/students_info', (req, res) => {
    var s = "SELECT * FROM students";
    con.query(s, (error, results) => {
        if (error) throw error;
        res.send("Success");
    })
})
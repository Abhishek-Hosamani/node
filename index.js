// const mysql = require('mysql');
// const express = require('express');
// const app = express();
// const bodyparser = require('body-parser');


// app.use(bodyparser.json());
// var mysqlconnection = mysql.createConnection({
//     host: '127.0.0.1', // If localhost is not working use this 127.0.0.1
//     user: "root",
//     password: "",
//     database: 'phptut'
// })

// mysqlconnection.connect((err) => {
//     if (!err)
//         console.log('DB connected success');
//     else
//         console.log(err);
// })

// app.listen(3000, () => console.log("Express server is listening at port 3000"));

// // get all emplyee details from the database
// app.get('/employee', (res, req) => {
//     mysqlconnection.query('SELECT * FROM employee', (err, rows, fields) => {
//         if (!err)
//             // res.send(rows);
//             console.log(rows);
//         else
//             console.log(err);
//     })
// })

// NEW VIDEO //


// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: "phptut"
// });

// con.connect((err) => {
//     if (!err) {
//         con.query("SELECT * FROM employee", (err, result) => {
//             if (err) throw error;
//             console.log(result[2].Name);
//         });
//     }

// })

var con = require("./connect");
var express = require('express');
var app = express();



var bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/register.html");
})
app.listen(7000);

con.connect((error) => {
    if (error) throw error;
    console.log("DB Connected");
})

app.post('/', (req, res) => {
    var name = req.body.name;
    var email = req.body.Email;
    var mob = req.body.mobile;

    var sql = ` INSERT INTO students(Name,email,mobile) VALUES('${name}','${email}',${mob})`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        // console.log("Success")
        // res.send("Successfully Inserted");
        res.redirect('/students');
    })



})


app.get('/students', (req, res) => {

    var sql = 'SELECT * FROM students';
    con.query(sql, (err, results) => {
        if (err) console.log('sql error');
        console.log(results);
        res.render(__dirname + "/students", { students: results });

    })
})

app.get('/delete-student', (req, res) => {

    var sql2 = `DELETE FROM students where id='${req.query.id}'`;

    con.query(sql2, (err, results) => {
        if (err) console.log('sql error');
        res.redirect('/students');

    });


});

app.get('/update-student', (req, res) => {

    var sql2 = `SELECT * FROM students where id='${req.query.id}'`;

    con.query(sql2, (err, results) => {
        if (err) console.log('sql error');
        res.render(__dirname + "/update-student", { student: results });

    });


});

app.post('/update-student', (req, res) => {

    var name = req.body.name;
    var em = req.body.Email;
    var mob = req.body.mobile;
    var id = req.body.Id;

    var sql2 = `UPDATE  students set Name='${name}', email='${em}', mobile='${mob}' where id='${id}' `;

    con.query(sql2, (err, results) => {
        if (err) console.log('sql error');
        console.log(results)
        res.redirect('/students');
    });
})
'use strict';
const express = require("express");
const app = express();
const path = require("path");
const mysql = require('mysql2');
app.use(express.json());
app.use(express.urlencoded({extended: false})); //false: uses querystring to work with simples urls. 
                                                //true: uses qs to work with complex urls. ex: /?users[09]=Var&age=16&{ex: "ex"}

const publicPath = path.join(__dirname, "public"); //takes actual folder path and then select "public folder"
const mainPath = path.join(publicPath, "src/main");
app.use(express.static(publicPath)); //tells express to use static files in this path

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules'))); //for boostrap
app.use(express.static(publicPath));

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'database',
    user: 'root',
    password: ''
});

app.get("/", function(req,res){ 
    res.sendFile(path.join(mainPath, "index.html"));
});

app.get('/favicon.ico', (req, res) => res.status(204)); //remove browser icon

app.listen(3000, function() {
    console.log("Listening to http://localhost:3000");
});
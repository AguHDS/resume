'use strict';
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const publicPath = path.join(__dirname, "public");
const mainPath = path.join(publicPath, "src/main");
app.use(express.static(publicPath));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.get("/", function(req, res) {
    res.sendFile(path.join(mainPath, "index.html"));
});

// Redirecciona todas las solicitudes a la página principal
app.get("*", function(req, res, next) {
    if (req.headers.host.match(/^www\.(.*)$/)) {
        const newUrl = req.protocol + '://' + req.headers.host.replace(/^www\./, '') + req.url; //no funciona bien la redireccion
        return res.redirect(301, newUrl);
    }
    next();
});

app.get('/favicon.ico', (req, res) => res.status(204)); //remove browser icon

app.listen(3000, function() {
    console.log("Listening to http://localhost:3000");
});
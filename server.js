const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));

app.use(cors());

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
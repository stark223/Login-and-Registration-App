const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

dotenv.config({
    path: './.env'
})




const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATA_BASE_USER,
    password: process.env.DATA_BASE_PASS,
    database: process.env.DATA_BASE
});

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MySQL Connection Success");
    }
})
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// console.log(__dirname);
const location = path.join(__dirname, "./public");
app.use(express.static(location));

const partialsPath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath)


app.set("view engine", "hbs");

app.use('/', require('./routes/pages'));

app.use("/auth", require('./routes/auth'));

app.listen(5000, () => {
    console.log("Server started @ port 5000");
});


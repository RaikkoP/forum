const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

//User can consist of lower, upper, numbers and underscores
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//password must contain one lwoer case, one upper case, one number, one symbol and must be 8-24 long
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: "d121755.mysql.zonevs.eu",
  user: "d121755sa461709",
  password: "Krissuonminu123",
  database: "d121755_forum",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM USERS";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Get images from backend
app.get("/images", (req, res) => {

});

//Send images to backend
app.post("/upload", upload.single('image'), (req, res) => {
  
});

//Gather user informatio
app.post("/userdata", (req, res) => {
  const sql = "SELECT * FROM USERS WHERE Username = ?";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (
      data.length > 0 &&
      bcrypt.compare(req.body.password, data[0].Password)
    ) {
      return res.json(data);
    } else if (err) res.json(err);
  });
});

//Handles Login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM USERS WHERE Username = ?";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (USER_REGEX.test(req.body.username)) {
      if (
        bcrypt.compare(req.body.password, data[0].Password) &&
        PASSWORD_REGEX.test(req.body.password)
      ) {
        return res.json(data);
      } else {
        return res.status(410).send('Invalid password');
      }
    } else {
      return res.status(409).send('Invalid username');
    }
  });
});

//Still needs error handling
app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO USERS (Username,Password,Bio,ImageID) VALUES (?,?,'Test Bio!',1)";
  const userCheck = "SELECT * FROM USERS WHERE Username = ?";
  db.query(userCheck, [req.body.username], (err, data) => {
    if (data.length < 1) {
      if (
        USER_REGEX.test(req.body.username) &&
        PASSWORD_REGEX.test(req.body.password)
      ) {
        db.query(
          sql,
          [req.body.username, req.body.hashedPassword],
          (err, data) => {
            if (err)
              return res.json("Server has pushed back registration attempt");
          }
        );
      } else {
        return res.status(405).send('Invalid username or password');
      }
    } else {
      return res.status(409).send(['Account with same name already exists']);
    }
  });
});

app.listen(8081, () => {
  console.log("listening");
});

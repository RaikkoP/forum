const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
//User can consist of lower, upper, numbers and underscores
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//password must contain one lwoer case, one upper case, one number, one symbol and must be 8-24 long
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "d121755.mysql.zonevs.eu",
  user: "",
  password: "",
  database: "d121755_forum",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM USER_INFO";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Gather user informatio
app.post("/userdata", (req, res) => {
  const sql = "SELECT * FROM USER_INFO WHERE USERNAME = ? AND PASSWORD = ?";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (data.length > 0) {
      return res.json(data);
    }
  });
});

//Handles Login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM USER_INFO WHERE USERNAME = ?";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (USER_REGEX.test(req.body.username)) {
      if (data.length > 0) {
        if (
          bcrypt.compare(req.body.password, data[0].PASSWORD) &&
          PASSWORD_REGEX.test(req.body.password)
        ) {
          return res.json(data);
        } else {
          return res.status(410).send();
        }
      } else {
        return res.status(409).send();
      }
    } else {
      return res.status(409).send();
    }
  });
});

//Still needs error handling
app.post("/register", (req, res) => {
  const sql = "INSERT INTO USER_INFO (USERNAME,PASSWORD) VALUES (?,?)";
  const userCheck = "SELECT * FROM USER_INFO WHERE USERNAME = ?";
  db.query(userCheck, [req.body.username], (err, data) => {
    if (data.length < 1) {
      if (USER_REGEX.test(req.body.username) === true) {
        if (PASSWORD_REGEX.test(req.body.password) === true) {
          db.query(
            sql,
            [req.body.username, req.body.hashedPassword],
            (err, data) => {
              if (err)
                return res.json("Server has pushed back registration attempt");
            }
          );
        } else {
          return res.status(403).send();
        }
      } else {
        return res.status(405).send();
      }
    } else {
      return res.status(409).send();
    }
  });
});

app.listen(8081, () => {
  console.log("listening");
});

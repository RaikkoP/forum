const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
//User can consist of lower, upper, numbers and underscores
export const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//password must contain one lwoer case, one upper case, one number, one symbol and must be 8-24 long
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "d121755.mysql.zonevs.eu",
    user: "d121755sa461709",
    password: "Krissuonminu123",
    database: "d121755_forum"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM USER_INFO"
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM USER_INFO WHERE USERNAME = ? AND PASSWORD = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data)=>{
        if(err) return res.json(err);
        if(data.length > 0) {
            return res.json("Login Succesfully")
        } else {
            return res.json("No account")
        }
    })
})

app.post('/register', (req,res) => {
    const sql = "INSERT INTO USER_INFO (USERNAME,PASSWORD) VALUES (?,?)"
    if(USER_REGEX.test(req.body.username) === true && PASSWORD_REGEX.test(req.body.password) === true){
        db.query(sql, [req.body.username, req.body.password], (err, data)=>{
            if(err) return res.json('Server has pushed back registration attempt');
        })
    } 
})

app.listen(8081, ()=> {
    console.log("listening");

})
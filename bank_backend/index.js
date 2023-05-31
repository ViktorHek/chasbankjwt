import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import jwt from "jsonwebtoken";
import mysql from "mysql";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

sqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// const token = 'e6d83a7e10c8c96c3cd473cbff9a903ad6bdd2e448a1dc118816477c0f1013e8e35122744eebb5dd4d9c8452bff157b2c2bdf0971c9eb1a1057333a0895121bd'

// const users = [];
// const accounts = [];

app.post("/users", (req, res) => {
  try {
    res.send(handleNewUser(req.body));
  } catch (err) {
    console.log(err);
  }
});

app.post("/sessions", (req, res) => {
  try {
    res.send(checkIfUser(req.body));
  } catch (err) {
    console.log(err);
  }
});

app.get("/me/accounts/:id", (req, res) => {
  try {
    res.send(getMoney(req.params.id));
  } catch (err) {
    console.log(err);
  }
});
// app.get("/me/accounts/:token", (req, res) => {
//   try {
//     res.send(getMoney(req.params.token))
//   } catch (err) {
//     console.log(err);
//   }
// });

const handleNewUser = async (data) => {
  let id = users.length + 1;
  // users.push({
  //   id: id,
  //   userName: data.userName,
  //   password: data.password
  // })
  // accounts.push({
  //   id: id,
  //   amount: data.amount
  // })
  let returnValue
  try {
    await sqlConnection.questionToDb(
      `INSERT INTO users (userId, userName, password) VALUES (${id},${data.userName},${data.password})`
    );
    returnValue = "succesfully added user";
  } catch (error) {
    console.log(error);
    returnValue = "error with sql - adding user";
  }
  try {
    await sqlConnection.questionToDb(
      `INSERT INTO accounts (userId, amount) VALUES (${id},${data.amount})`
    );
    returnValue = returnValue + " succesfully added account";
  } catch (error) {
    console.log(error);
    returnValue = returnValue + " error with sql - adding user";
  }
  return returnValue;
};

const checkIfUser = async (data) => {
  try {
    let dbUser = await sqlConnection.questionToDb(
      `SELECT * FROM users WHERE users.userName = ${data.userName} AND users.password = ${data.password}`
    );
    if (dbUser) {
      return dbUser;
    } else {
      return "incorrect username or password";
    }
  } catch (error) {
    console.log(error);
    return "error in sql";
  }

  // let returnVal = false
  // users.forEach((el) => {
  //   if (el.userName === data.userName && el.password === data.password) returnVal = jwt.sign({id: el.id}, token)}
  // )
  // return returnVal
};

const getMoney = async (id) => {
  // if(jToken === 'false') return 'no token'
  // let res = { money: 0 }
  // let check = jwt.verify(jToken, token)
  // accounts.forEach((el) => {
  //   if(el.id == check.id) res.money = el.amount
  // })
  // return res
  try {
    let money = await sqlConnection.questionToDb(
      `SELECT amount FROM accounts WHERE accounts.userId = ${id}`
    );
    return money;
  } catch (error) {
    console.log(error);
    return "error in sql";
  }
};

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

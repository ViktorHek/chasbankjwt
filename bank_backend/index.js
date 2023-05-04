import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const token = 'e6d83a7e10c8c96c3cd473cbff9a903ad6bdd2e448a1dc118816477c0f1013e8e35122744eebb5dd4d9c8452bff157b2c2bdf0971c9eb1a1057333a0895121bd'

const users = []
const accounts = []

app.post("/users", (req, res) => {
  try {
    res.send(handleNewUser(req.body))
  } catch (err) {
    console.log(err);
  }
});

app.post("/sessions", (req, res) => {
  try {
    res.send(checkIfUser(req.body))
  } catch (err) {
    console.log(err);
  }
});

app.get("/me/accounts/:token", (req, res) => {
  try {
    res.send(getMoney(req.params.token))
  } catch (err) {
    console.log(err);
  }
});

function handleNewUser(data) {
  let id = users.length + 1
  users.push({
    id: id,
    userName: data.userName,
    password: data.password
  })
  accounts.push({
    id: id,
    amount: data.amount
  })
  return 'New User has been added'
}

function checkIfUser(data) {
  let returnVal = false
  users.forEach((el) => {
    if (el.userName === data.userName && el.password === data.password) returnVal = jwt.sign({id: el.id}, token)}
  )
  return returnVal
}

function getMoney(jToken) {
  if(jToken === 'false') return 'no token'
  let res = { money: 0 }
  let check = jwt.verify(jToken, token)
  accounts.forEach((el) => {
    if(el.id == check.id) res.money = el.amount
  })
  return res
}

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

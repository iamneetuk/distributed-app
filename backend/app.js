const express = require('express');
const cors = require("cors");
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

var usersDb = {};
var userEmail = [];

app.get('/', (req, res) => {
  res.send('<p>home page!!</p>');
});


app.post('/register', (req, res) => {
  var response = insertUserDb(req.body);
  response.then(value => {
    res.status(200).send(value);
  }, err => {
    console.log(err);
    res.status(500).send(err);
  });
});


app.get('/user/:id', (req, res) => {
  let id = req.params.id;
  var response = getUser(id);
  response.then(value => {
    res.status(200).send(value);
  }, err => {
    console.log(err);
    res.status(500).send(err);
  });
})


getUser = async(id) =>  {
  var response = {};

  if (typeof usersDb[id]!== "undefined"){
    let email = usersDb[id].email;
    response["email"] = email;
    response["message"] = "User entry found!";
    response["isActiveUser"] = true;
  } else{
    response["message"] = "User not found!";
    response["isActiveUser"] = false;
  }
  return response;
}

// password g21G8A8562sbSHbA
insertUserDb = async(params) => {
  email = params.email;
  password = params.password;
  var response = {};

  if (!userEmail.includes(params.email)){
    totalUser = userEmail.length;
    var newUser = {"email": email, "password": password};

    userId = totalUser + 1;

    userEmail.push(email);
    usersDb[userId] = newUser;
    response["userId"] = userId;
    response["message"] = "New userrr added";
  } else{
    response["userId"] = userId;
    response["message"] = "User already exists. Try login!";
  }
  console.log(JSON.stringify(usersDb));
  console.log(JSON.stringify(userEmail));
  return response;
}

app.listen(3001, () => {
  console.log(`Yey, your server is running on port ${3001}`);
});


const express = require("express");
const app = express();
const fs = require("fs");
const cors = require('cors')
app.use(express.json(), cors());
const port = process.env.PORT || 8081;


app.get("/checkEmail", (req, res) => {
  const {email} = req.query;

  let isRegisteredEmail = false;
  fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
    data = JSON.parse(data);
    data.forEach(element => {
        if((element.email.toLowerCase() === email.toLowerCase())) {
          isRegisteredEmail = true;
        } 
    });
    res.status(200).send({isRegisteredEmail});
  })
 
});


app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
    data = JSON.parse(data);
    data.push({email, password});
    json = JSON.stringify(data);
    fs.writeFile(__dirname + "/" + "data.json", json, 'utf8', () => {
      res.send({token: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0MzEzOTUwOSwiaWF0IjoxNjQzMTM5NTA5fQ.xRBnU9R8ljNI1VM5p3nIwJlZyOePatcahUCprAOQ6V0'});
    })
  })
 
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let isValidUser = false;
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
      data = JSON.parse(data);
      data.forEach(element => {
          if((element.email.toLowerCase() === email.toLowerCase()) && (element.password === password)) {
            isValidUser = true;
          } 
      });
      if(isValidUser){
        res.send({token: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0MzEzOTUwOSwiaWF0IjoxNjQzMTM5NTA5fQ.xRBnU9R8ljNI1VM5p3nIwJlZyOePatcahUCprAOQ6V0'});
      } else {
        res.status(401).send({data:'Invalid email or password'});
      }
    })
   
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

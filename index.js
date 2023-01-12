const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


let users =[{"id": 1, "firstName":"Philippe", "lastName": "VLIEGHE"}, 
            {"id": 2, "firstName":"Philou", "lastName": "PHI"}];
let count = users.length;

app.use(express.json())

app.get('/users', (req, res) => {
  res.send(users)
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = count + 1;

    users.push(newUser);

    res.sendStatus(201);
});
app.get('/users/:firstName', (req, res) => {
    let user = users.find(function(element) {
        return element.firstName === req.params.firstName;
    });
    res.send(user)
  });

app.post('/users/:id/modify', (req, res) => {
    const modifUser = req.body;
    const id = req.params.id;
    const mod = users.find(function(element) {
        return element.id === id;
    })
    let index = users.indexOf(mod);
    users[index] = modifUser;
    res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
const express = require("express");
const bp = require('body-parser');
const app = express();
const port = 3000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const students = [];

app.get('/', (req, res) => {
    return res.send(students);
});

app.post('/add', (req, res) => {
    students.push({
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    });

    return res.send("success");
});

app.get('/:searchBy/:value', (req, res) => {
    for(let i = 0; i < students.length; ++i) {
        if(students[i][req.params.searchBy] === req.params.value) {
            return res.send(students[i]);
        }
    }

    return res.send("student not found");
});

app.delete('/delete/:searchBy/:value', (req, res) => {
    for(let i = 0; i < students.length; ++i) {
        if(students[i][req.params.searchBy] === req.params.value) {
            delete students[i];

            return res.send("student deleted");
        }
    }

    return res.send("student not found");
});

app.put('/update/:searchBy', (req, res) => {
    for(let i = 0; i < students.length; ++i) {
        if(req.params.searchBy === students[i].email) {
            for(let key in req.body) {
                students[i][key] = req.body[key];
            }
            return res.send("success");
        }
    }

    return res.send("student not found");
});

app.listen(port, () => {
    console.log("localhost 3000");
});
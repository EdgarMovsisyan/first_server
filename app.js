const express = require("express");
const bp = require('body-parser');
const Student = require('./student.js');
const app = express();
const port = 3000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const students = [];

app.get('/', (req, res) => {
    return res.send(Student.students);
});

app.post('/add', (req, res) => {
     new Student(req.body.name, req.body.age, req.body.email).add();

    return res.send("success");
});

app.get('/search/:value', (req, res) => {
    for(let i = 0; i < Student.students.length; ++i) {
        if(req.params.value === Student.students[i].email) {
            return res.send(Student.students[i]);
        }
    }

    return res.send("student not found");
});

app.delete('/delete/:value', (req, res) => {
    for(let i = 0; i < Student.students.length; ++i) {
        if(req.params.value === Student.students[i].email) {
            delete Student.students[i];

            return res.send("student deleted");
        }
    }

    return res.send("student not found");
});

app.put('/update/:value', (req, res) => {
    for(let i = 0; i < Student.students.length; ++i) {
        if(req.params.value === Student.students[i].email) {
            for(let key in req.body) {
                Student.students[i][key] = req.body[key];
            }
            return res.send("success");
        }
    }

    return res.send("student not found");
});

app.listen(port, () => {
    console.log("localhost 3000");
});
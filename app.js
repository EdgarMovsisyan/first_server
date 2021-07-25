const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const Student = require('./student.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


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

(async function start() {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/firstServer',
            { useNewUrlParser: true, useUnifiedTopology: true }
        );

        app.listen(PORT, () => {
            console.log("localhost 3000");
        });
    } catch {

    }
})();
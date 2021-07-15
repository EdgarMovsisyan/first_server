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
        age: req.body.age
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

app.delete('/delete/:id/:value', (req, res) => {
    for(let i = 0; i < students.length; ++i) {
        if(students[i][req.params.id] === req.params.value) {
            delete students[i];

            return res.send("student deleted");
        }
    }

    return res.send("student not found");
});

app.put('/update/:searchBy/:oldValue/:newValue', (req, res) => {
    console.log(req.params);
    for(let i = 0; i < students.length; ++i) {
        if(students[i][req.params.searchBy] === req.params.oldValue) {
            students[i][req.params.searchBy] = req.params.newValue;
        }

        return res.send("success");
    }

    return res.send("student not found");
});

app.listen(port, () => {
    console.log("localhost 3000");
});
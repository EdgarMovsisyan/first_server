class Student {
    static students = [];

    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    };


    add() {
        Student.students.push(this);
    };
};

module.exports = Student;

const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Array to store student records
let students = [];

// HOME ROUTE
app.get('/', (req, res) => {
    res.send("Server is running on port 3000");
});


// TASK 2: CREATE STUDENT (POST)
app.post('/api/students', (req, res) => {

    const { id, name, email, course, age } = req.body;

    // Validate mandatory fields
    if (id == null || !name || !email || !course || age == null) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Create student object
    const student = {
        id,
        name,
        email,
        course,
        age
    };

    // Store student in array
    students.push(student);

    res.status(201).json({
        message: "Student created successfully",
        student: student
    });

});


// TASK 3: GET ALL STUDENTS
app.get('/api/students', (req, res) => {

    res.status(200).json(students);

});


// TASK 3: GET STUDENT BY ID
app.get('/api/students/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);

});


// TASK 4: UPDATE STUDENT (PUT)
app.put('/api/students/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (!name || !email || !course || age == null) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Update student details
    student.name = name;
    student.email = email;
    student.course = course;
    student.age = age;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });

});


// TASK 5: DELETE STUDENT (DELETE)
app.delete('/api/students/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Delete student from array
    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });

});


// START SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

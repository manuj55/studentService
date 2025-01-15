const express = require("express");

const Student = require("../models/student");

const { verifyRole, restrictStudentToOwnData } = require("./auth/util");
const { ROLES } = require("../../consts");

const router = express.Router();


//create student
router.post("/", async (req, res) => {
    //onj destructuring 
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all the fields" });
    }

    try {
        const existingStudent = await Student.findOne({ email })
        if (existingStudent) {
            return res.status(400).json({ message: "Student already exists" });
        }
        //Create a new student
        const newStudent = new Student({
            name,
            email,
            password
        });
        const savedStudent = await newStudent.save();

        res.status(201).json(savedStudent);
    } catch (error) {
        return res.status(500).json({ message: "Server Error:Something went wrong" });
    }
})

router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ message: "Server Error:Something went wrong" });
    }
});

//update student
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Please provide all the fields" });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, { name, email }, { new: true });
        res.status(200).json(updatedStudent);
    } catch (error) {
        return res.status(500).json({ message: "Server Error:Something went wrong" });
    }
});

module.exports = router;

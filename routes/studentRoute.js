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

module.exports = router;

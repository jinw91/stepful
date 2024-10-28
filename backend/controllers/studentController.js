const Students = require('../models/Students'); // Adjust the path as necessary

// Create a new student
const createStudent = async (req, res) => {
    const { name, phone_number, password } = req.body;
    try {
        const newStudent = await Students.create({ name, phone_number, password });
        return res.status(201).json(newStudent);
    } catch (error) {
        console.error('Create Student error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Students.findAll();
        return res.status(200).json(students);
    } catch (error) {
        console.error('Get Students error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Students.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        return res.status(200).json(student);
    } catch (error) {
        console.error('Get Student error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a student
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, phone_number, password } = req.body;

    try {
        const [updated] = await Students.update(
            { name, phone_number, password },
            { where: { student_id: id } }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const updatedStudent = await Students.findByPk(id);
        return res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Update Student error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Students.destroy({ where: { student_id: id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Student not found' });
        }
        return res.status(204).send(); // No content
    } catch (error) {
        console.error('Delete Student error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};

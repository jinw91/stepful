// controllers/coachController.js

const Coaches = require('../models/Coaches'); // Adjust the path as necessary

// Create a new coach
const createCoach = async (req, res) => {
    const { name, phone_number, password } = req.body;
    try {
        const newCoach = await Coaches.create({ name, phone_number, password });
        return res.status(201).json(newCoach);
    } catch (error) {
        console.error('Create Coach error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all coaches
const getAllCoaches = async (req, res) => {
    try {
        const coaches = await Coaches.findAll();
        return res.status(200).json(coaches);
    } catch (error) {
        console.error('Get Coaches error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single coach by ID
const getCoachById = async (req, res) => {
    const { id } = req.params;
    try {
        const coach = await Coaches.findByPk(id);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }
        return res.status(200).json(coach);
    } catch (error) {
        console.error('Get Coach error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a coach
const updateCoach = async (req, res) => {
    const { id } = req.params;
    const { name, phone_number, password } = req.body;

    try {
        const [updated] = await Coaches.update(
            { name, phone_number, password },
            { where: { coach_id: id } }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        const updatedCoach = await Coaches.findByPk(id);
        return res.status(200).json(updatedCoach);
    } catch (error) {
        console.error('Update Coach error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a coach
const deleteCoach = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Coaches.destroy({ where: { coach_id: id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Coach not found' });
        }
        return res.status(204).send(); // No content
    } catch (error) {
        console.error('Delete Coach error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createCoach,
    getAllCoaches,
    getCoachById,
    updateCoach,
    deleteCoach,
};

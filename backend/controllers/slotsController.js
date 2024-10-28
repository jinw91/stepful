const { Op } = require('sequelize');
const sequelize = require('../config');
const Slots = require('../models/Slots');
const Students = require('../models/Students');
const Coaches = require('../models/Coaches');
const Calls = require('../models/Calls');

// Create a new slot
const createSlot = async (req, res) => {
    try {
        const { coach_id, start_time, student_id } = req.body;
        const slot = await Slots.create({ coach_id, start_time, student_id });
        return res.status(201).json(slot);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Read all slots
const getAllSlots = async (req, res) => {
    try {
        const currentTime = new Date();

        const slots = await Slots.findAll({
            where: {
                start_time: {
                    [Op.gt]: currentTime // Get slots with start_time greater than the current time
                }
            }
        });

        return res.status(200).json(slots);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// Read all slots by CoachId
const getSlotsByCoachId = async (req, res) => {
    const { coach_id } = req.params;
    try {
        const currentTime = new Date();

        const slots = await Slots.findAll({
            where: {
                coach_id: coach_id,
                start_time: {
                    [Op.gt]: currentTime // Get slots with start_time less than the current time
                }
            },
            include: Students,
        });

        if (slots.length === 0) {
            return res.status(404).json({ message: 'No slots found for this coach' });
        }

        return res.status(200).json(slots);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Read all slots by StudentId
const getSlotsByStudentId = async (req, res) => {
    const { student_id } = req.params;

    try {
        const slots = await Slots.findAll({
            where: { student_id: student_id },
            include: Coaches,
        });

        if (slots.length === 0) {
            return res.status(404).json({ message: 'No slots found for this student' });
        }

        return res.status(200).json(slots);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// Update a slot
const updateSlot = async (req, res) => {
    try {
        const { coach_id, start_time, student_id } = req.body;
        const [updated] = await Slots.update(
            { coach_id, start_time, student_id },
            { where: { slot_id: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        const updatedSlot = await Slots.findByPk(req.params.id);
        return res.status(200).json(updatedSlot);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a slot
const deleteSlot = async (req, res) => {
    try {
        const deleted = await Slots.destroy({
            where: { slot_id: req.params.id },
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Create or update multiple slots
const createOrUpdateBulkSlots = async (req, res) => {
    const transactions = [];

    try {
        const slotsData = req.body; // Array of slot objects
        for (const slot of slotsData) {
            const [record, created] = await Slots.upsert(slot);
            transactions.push(record);
        }
        return res.status(200).json({ message: 'Slots created or updated successfully', data: transactions });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get all past slots for a coach without corresponding calls
const getPastSlotsWithoutCallsByCoachId = async (req, res) => {
    const { coach_id } = req.params;

    try {
        const currentTime = new Date();

        const pastSlots = await Slots.findAll({
            where: {
                coach_id: coach_id,
                start_time: {
                    [Op.lt]: currentTime // Get slots with start_time less than the current time
                },
                student_id: { [Op.ne]: null }
            },
            include: [{
                model: Calls,
                required: false
            }],
            having: sequelize.where(sequelize.fn('COUNT', sequelize.col('Calls.slot_id')), 0), // Ensure no corresponding calls exist
            group: ['Slots.slot_id', 'Calls.call_id'] // Group by slot_id and call_id to apply having
        });

        if (pastSlots.length === 0) {
            return res.status(404).json({ message: 'No past slots found for this coach without corresponding calls' });
        }

        return res.status(200).json(pastSlots);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSlot,
    getAllSlots,
    getSlotsByCoachId,
    getSlotsByStudentId,
    updateSlot,
    deleteSlot,
    createOrUpdateBulkSlots,
    getPastSlotsWithoutCallsByCoachId
};

const Calls = require('../models/Calls');
const Slots = require('../models/Slots');

const createCall = async (req, res) => {
    try {
        const { slot_id, satisfaction_score, notes } = req.body;
        const call = await Calls.create({ slot_id, satisfaction_score, notes });
        return res.status(201).json(call);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllCallsByCoachId = async (req, res) => {
    const { coach_id } = req.params; // Get the coach_id from the request parameters

    try {
        const calls = await Calls.findAll({
            include: {
                model: Slots,
                where: { coach_id: coach_id }, // Filter calls by coach_id
            },
        });

        if (calls.length === 0) {
            return res.status(404).json({ message: 'No calls found for this coach' });
        }

        return res.status(200).json(calls);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateCall = async (req, res) => {
    const { id } = req.params;
    const { slot_id, satisfaction_score, notes } = req.body;

    try {
        const [updated] = await Calls.update(
            { slot_id, satisfaction_score, notes },
            { where: { call_id: id } }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Call not found' });
        }
        const updatedCall = await Calls.findByPk(id);
        return res.status(200).json(updatedCall);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteCall = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Calls.destroy({
            where: { call_id: id },
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Call not found' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCall,
    getAllCallsByCoachId,
    updateCall,
    deleteCall,
};

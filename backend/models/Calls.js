const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Slots = require('./Slots');

const Calls = sequelize.define('Calls', {
    call_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    slot_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Slots,
            key: 'slot_id',
        },
        allowNull: false,
    },
    satisfaction_score: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
        },
    },
    notes: {
        type: DataTypes.TEXT,
    },
});

module.exports = Calls;

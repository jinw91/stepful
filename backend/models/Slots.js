const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Coaches = require('./Coaches');
const Students = require('./Students');

const Slots = sequelize.define('Slots', {
    slot_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    coach_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Coaches,
            key: 'coach_id',
        },
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Students,
            key: 'student_id',
        },
        allowNull: true,
    },
});

module.exports = Slots;

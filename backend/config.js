const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('stepful', 'postgres', '5k6Qk9dKahtZCKTNfJ2w', {
    host: 'stepful-pge.cb62wikm6qdc.us-east-2.rds.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // For self-signed certificates
        }
    },
});

module.exports = sequelize;

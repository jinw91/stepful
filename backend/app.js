const sequelize = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const coachRoutes = require('./routes/coach');
const slotsRoutes = require('./routes/slots');
const studentRoutes = require('./routes/student');
const callsRoutes = require('./routes/calls');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const Coaches = require('./models/Coaches');
const Students = require('./models/Students');
const Slots = require('./models/Slots');
const Calls = require('./models/Calls');


// Define relationships
Coaches.hasMany(Slots, { foreignKey: 'coach_id' });
Slots.belongsTo(Coaches, { foreignKey: 'coach_id' });

Students.hasMany(Slots, { foreignKey: 'student_id' });
Slots.belongsTo(Students, { foreignKey: 'student_id' });

Slots.hasMany(Calls, { foreignKey: 'slot_id' });
Calls.belongsTo(Slots, { foreignKey: 'slot_id' });


// app.js
const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions));

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Coaching API',
            version: '1.0.0',
            description: 'API documentation for the Coaching application',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json()); // Parse JSON bodies
app.use('/api/coaches', coachRoutes);
app.use('/api/slots', slotsRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/calls', callsRoutes);

sequelize.sync({ alter: false }).then(() => {
    app.listen(PORT);
}).catch(err => {
    console.log(err);
})
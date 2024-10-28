const express = require('express');
const {
    createCoach,
    getAllCoaches,
    getCoachById,
    updateCoach,
    deleteCoach,
} = require('../controllers/coachController');

const router = express.Router();

/**
 * @swagger
 * /api/coaches:
 *   post:
 *     summary: Create a new coach
 *     description: Adds a new coach to the database.
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Coach created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', createCoach);

/**
 * @swagger
 * /api/coaches:
 *   get:
 *     summary: Get all coaches
 *     description: Retrieves a list of all coaches.
 *     tags: [Coaches]
 *     responses:
 *       200:
 *         description: List of coaches
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllCoaches);

/**
 * @swagger
 * /api/coaches/{id}:
 *   get:
 *     summary: Get a coach by ID
 *     description: Retrieves a coach by their ID.
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the coach to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coach found
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getCoachById);

/**
 * @swagger
 * /api/coaches/{id}:
 *   put:
 *     summary: Update a coach
 *     description: Updates a coach's details.
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the coach to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coach updated successfully
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateCoach);

/**
 * @swagger
 * /api/coaches/{id}:
 *   delete:
 *     summary: Delete a coach
 *     description: Deletes a coach by their ID.
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the coach to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Coach deleted successfully
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteCoach);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    createCall,
    getAllCallsByCoachId,
    updateCall,
    deleteCall,
} = require('../controllers/callsController');

/**
 * @swagger
 * /api/calls:
 *   post:
 *     summary: Create a new call
 *     tags: [Calls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slot_id:
 *                 type: integer
 *               satisfaction_score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Call created successfully
 *       500:
 *         description: Server error
 */
router.post('/', createCall);

/**
 * @swagger
 * /api/calls/coach/{coach_id}:
 *   get:
 *     summary: Retrieve all calls by Coach ID
 *     tags: [Calls]
 *     parameters:
 *       - name: coach_id
 *         in: path
 *         required: true
 *         description: ID of the coach to retrieve calls for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of calls for the specified coach
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   call_id:
 *                     type: integer
 *                   slot_id:
 *                     type: integer
 *                   satisfaction_score:
 *                     type: integer
 *                   notes:
 *                     type: string
 *                   call_time:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No calls found for this coach
 *       500:
 *         description: Server error
 */
router.get('/coach/:coach_id', getAllCallsByCoachId);

/**
 * @swagger
 * /api/calls/{id}:
 *   put:
 *     summary: Update a call by ID
 *     tags: [Calls]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Call ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slot_id:
 *                 type: integer
 *               satisfaction_score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Call updated successfully
 *       404:
 *         description: Call not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateCall);

/**
 * @swagger
 * /api/calls/{id}:
 *   delete:
 *     summary: Delete a call by ID
 *     tags: [Calls]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Call ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Call deleted successfully
 *       404:
 *         description: Call not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteCall);

module.exports = router;

const express = require('express');
const {
  createSlot,
  getAllSlots,
  getSlotsByCoachId,
  getSlotsByStudentId,
  updateSlot,
  deleteSlot,
  createOrUpdateBulkSlots,
  getPastSlotsWithoutCallsByCoachId
} = require('../controllers/slotsController');

const router = express.Router();

/**
 * @swagger
 * /api/slots:
 *   post:
 *     summary: Create a new slot
 *     tags: [Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coach_id:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               student_id:
 *                 type: integer
 *             required:
 *               - coach_id
 *               - start_time
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 slot_id:
 *                   type: integer
 *                 coach_id:
 *                   type: integer
 *                 start_time:
 *                   type: string
 *                   format: date-time
 *                 student_id:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.post('/', createSlot);

/**
 * @swagger
 * /api/slots:
 *   get:
 *     summary: Get all slots
 *     tags: [Slots]
 *     responses:
 *       200:
 *         description: A list of slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   slot_id:
 *                     type: integer
 *                   coach_id:
 *                     type: integer
 *                   start_time:
 *                     type: string
 *                     format: date-time
 *                   student_id:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get('/', getAllSlots);

/**
 * @swagger
 * /api/slots/student/{student_id}:
 *   get:
 *     summary: Gets all slots by Student ID
 *     tags: [Slots]
 *     parameters:
 *       - name: student_id
 *         in: path
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of slots for the specified student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   slot_id:
 *                     type: integer
 *                   coach_id:
 *                     type: integer
 *                   start_time:
 *                     type: string
 *                     format: date-time
 *                   student_id:
 *                     type: integer
 *       404:
 *         description: No slots found for this student
 *       500:
 *         description: Server error
 */
router.get('/student/:student_id', getSlotsByStudentId);

/**
 * @swagger
 * /api/slots/{coach_id}:
 *   get:
 *     summary: Gets all slots by Coach ID
 *     tags: [Slots]
 *     parameters:
 *       - name: coach_id
 *         in: path
 *         required: true
 *         description: Coach ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   slot_id:
 *                     type: integer
 *                   coach_id:
 *                     type: integer
 *                   start_time:
 *                     type: string
 *                     format: date-time
 *                   student_id:
 *                     type: integer
 *       404:
 *         description: Slot not found
 *       500:
 *         description: Server error
 */
router.get('/coach/:coach_id', getSlotsByCoachId);

/**
 * @swagger
 * /api/slots/{id}:
 *   put:
 *     summary: Update a slot by ID
 *     tags: [Slots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the slot to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coach_id:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               student_id:
 *                 type: integer
 *             required:
 *               - coach_id
 *               - start_time
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 slot_id:
 *                   type: integer
 *                 coach_id:
 *                   type: integer
 *                 start_time:
 *                   type: string
 *                   format: date-time
 *                 student_id:
 *                   type: integer
 *       404:
 *         description: Slot not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateSlot);

/**
 * @swagger
 * /api/slots/{id}:
 *   delete:
 *     summary: Delete a slot by ID
 *     tags: [Slots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the slot to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       404:
 *         description: Slot not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteSlot);

/**
 * @swagger
 * /api/slots/bulk:
 *   post:
 *     summary: Create or update multiple slots
 *     tags: [Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 coach_id:
 *                   type: integer
 *                 start_time:
 *                   type: string
 *                   format: date-time
 *                 student_id:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Slots created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       slot_id:
 *                         type: integer
 *                       coach_id:
 *                         type: integer
 *                       start_time:
 *                         type: string
 *                         format: date-time
 *                       student_id:
 *                         type: integer
 *       500:
 *         description: Server error
 */
router.post('/bulk', createOrUpdateBulkSlots);

/**
 * @swagger
 * /api/slots/past-without-calls/{coach_id}:
 *   get:
 *     summary: Get past slots for a coach without corresponding calls
 *     tags: [Slots]
 *     parameters:
 *       - name: coach_id
 *         in: path
 *         required: true
 *         description: The ID of the coach to get past slots for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of past slots without corresponding calls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   slot_id:
 *                     type: integer
 *                   coach_id:
 *                     type: integer
 *                   start_time:
 *                     type: string
 *                     format: date-time
 *                   student_id:
 *                     type: integer
 *       404:
 *         description: No past slots found for this coach without corresponding calls
 *       500:
 *         description: Server error
 */
router.get('/past-without-calls/:coach_id', getPastSlotsWithoutCallsByCoachId);

module.exports = router;

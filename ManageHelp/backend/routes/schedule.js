const express = require('express')

const router = express.Router()

const {
    createSchedule,
    deleteSchedule,
    patchSchedule,
    getByID,
    getAllByWorkspace,
    addShift,
    removeShift,
    getByWorkspaceDate
} = require('../controllers/scheduleController')

router.post('/', createSchedule)

router.delete('/:id', deleteSchedule)
router.patch('/:id', patchSchedule)
router.get('/:id', getByID)

router.post('/shifts/:id', addShift)
router.delete('/shifts/:id', removeShift)

router.get('/workspace/:id', getAllByWorkspace)

router.get('/workspace/:id/date', getByWorkspaceDate)

module.exports = router
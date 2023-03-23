const express = require('express')

const router = express.Router()

const {
    createShift,
    deleteShift,
    patchShift,
    getByID,
    getAllByUser,
    getAllByWorkspace,
    getAllByUserAndWorkspace,
} = require('../controllers/shiftController')

router.post('/', createShift)

router.delete('/:id', deleteShift)
router.patch('/:id', patchShift)
router.get('/:id', getByID)

router.get('/user/:user_id', getAllByUser)

router.get('/workspace/:workspace_id', getAllByWorkspace)
router.get('/workspace/:workspace_id/:user_id', getAllByUserAndWorkspace)

module.exports = router
const express = require('express')
const {
    createWorkspace,
    getWorkspace,
    getWorkspaces,
    deleteWorkspace,
    updateWorkspace,
    joinWorkspace,
    removeUser,
    promoteUser,
    demoteUser,
    getEmployees,
    createAnnouncement,
    getAnnouncements
} = require('../controllers/workspaceController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//protect api routes from unauthorized access
router.use(requireAuth)

// GET all workspaces
router.get('/', getWorkspaces)

// GET a single workspace
router.get('/:id', getWorkspace)

// POST: Join a workspace
router.post('/:id', joinWorkspace)

// POST a new workspace
router.post('/', createWorkspace)

// DELETE a workspace
router.delete('/:id', deleteWorkspace)

// remove a user from a workspace
router.delete('/remove/:id', removeUser)

// update a workspace
router.patch('/:id', updateWorkspace)

// promote/demote a user
router.patch('/:id/promote', promoteUser)
router.patch('/:id/demote', demoteUser)

// get all employees of a workspace
router.get('/getEmployees/:id', getEmployees)

// POST a new announcement
router.post('/announce/:id', createAnnouncement)
// POST a new announcement
router.post('/removeAnnounce/:id', createAnnouncement)

// get all announcements of a workspace
router.get('/announce/:id', getAnnouncements)

module.exports = router
const express = require('express')
const {
    createWorkspace,
    getWorkspace,
    getWorkspaces,
    deleteWorkspace,
    updateWorkspace,
    joinWorkspace,
    removeUser,
    getEmployees
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

// UPDATE a workspace
router.patch('/:id', updateWorkspace)

// get all employees of a workspace
router.get('/getEmployees/:id', getEmployees)

module.exports = router
const express = require('express')
const {
    createWorkspace,
    getWorkspace,
    getWorkspaces,
    deleteWorkspace,
    updateWorkspace
} = require('../controllers/workspaceController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//protect api routes from unauthorized access
router.use(requireAuth)

// GET all workspaces
router.get('/', getWorkspaces)

// GET a single workspace
router.get('/:id', getWorkspace)

// POST a new workspace
router.post('/', createWorkspace)

// DELETE a workspace
router.delete('/:id', deleteWorkspace)

// UPDATE a workspace
router.patch('/:id', updateWorkspace)

module.exports = router
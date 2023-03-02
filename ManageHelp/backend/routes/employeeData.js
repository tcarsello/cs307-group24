const express = require('express')
const EmployeeData = require('../models/employeeDataModel')
const User = require('../models/userModel')
const Workspace = require('../models/workspaceModel')

const router = express.Router()

router.get('/:workspace_id/:user_id', async (req, res) => {

    try{

        const {workspace_id, user_id} = req.params
        console.log(`employee data get | wid:${workspace_id} uid:${user_id}`)

        const user = User.findOne({_id: user_id})
        const workspace = Workspace.findOne({_id: workspace_id})
        if (!user) {
            throw Error('No such user')
        }
        if (!workspace) {
            throw Error('No such workspace')
        }

        const ed = await EmployeeData.findOrCreate(workspace_id, user_id)

        res.status(200).json(ed)

    } catch (erorr) {
        res.status(400).json({error: error.message})
    } 

})

module.exports = router
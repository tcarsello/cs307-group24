require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const workspaceRoutes = require('./routes/workspaces')
const userRoutes = require('./routes/user')
const emailRoutes = require('./routes/email')
const inviteRoutes = require('./routes/invite')
const employeeDataRoutes = require('./routes/employeeData')
const shiftRoutes = require('./routes/shift')

// express app stored in app constant
const app = express()

// middleware (executes between request receipt and response)
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(bodyParser.json())
app.use(cors())

//routes
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/user', userRoutes)
app.use('/api/email', emailRoutes)
app.use('/api/invite', inviteRoutes)
app.use('/api/employeedata/', employeeDataRoutes)
app.use('/api/shift/', shiftRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })


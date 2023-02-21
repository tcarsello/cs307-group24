require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workspaceRoutes = require('./routes/workspaces')
const userRoutes = require('./routes/user')

// express app stored in app constant
const app = express()

// middleware (executes between request receipt and response)
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/user', userRoutes)

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


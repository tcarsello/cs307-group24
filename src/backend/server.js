require('dotenv').config()

const express = require('express')

// express app stored in app constant
const app = express()

// middleware (executes between request receipt and response)

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
})

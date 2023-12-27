const express = require('express');
const bodyParser = require('body-parser')
const mailRoute = require('./route/gmail.route')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/mail',mailRoute)

app.listen(5000, () => {
    console.log("Server is running on PORT 5000")
})
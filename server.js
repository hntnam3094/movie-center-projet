const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const passport = require('passport')
const config = require('./config/database')
const PORT = process.env.PORT || 3001
const API = require('./routes/api')
const bodyParser = require('body-parser')
var cors = require('cors')

//config
dotenv.config()
mongoose.connect(config.database)
.then(() => {
    console.log('Database connected')
})
.catch((err) => {
    console.log(err)
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/api', API)

app.get('/', function (req, res, next) {
    res.send('<h1>Epxress - Mongo - Passport</h1>')
})

app.listen(PORT, function() {
    console.log('This app running at port: ', PORT)
})
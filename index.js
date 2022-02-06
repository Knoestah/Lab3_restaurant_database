const express = require('express')
const mongoose = require('mongoose')
const PORT = 3000


const rest_Router = require('./routes/restaurantroutes.js')

const app = express()

app.use(express.json())

app.use('/restaurants', rest_Router)   // in the seed model

app.listen(PORT, () => { console.log(`server started at port ${PORT}`)})





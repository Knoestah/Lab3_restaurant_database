const express = require('express')
const restaurantModel = require('../models/restaurant_schema')

const app = express()

app.get('/', async (req, res) => {
    try {
        let restaurants = []

        console.log(req.query.sortBy)

        if(req.query.sortBy) {
            restaurants = await restaurantModel.find({}).sort({"_id": req.query.sortBy.toLowerCase()})
        } else {
            restaurants = await restaurantModel.find({})
        }

        res.status(200).send(restaurants)
    } catch (err) {
        console.log(err)
        res.status(500).send({error: err.toString()})
    }
})

app.post('/', async (req, res) => {
    const restaurant = new restaurantModel(req.body)

    try {
        await restaurant.save((err) => {
            if (err) {
                res.status(500).send({error: err.toString()})
            } else {
                res.send(restaurant)
            }
        })
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

app.get('/cuisine/:cuisine', async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({cuisine: req.params.cuisine})

        res.send(restaurants)
    } catch (err) {
        console.log(err)
        res.status(500).send({error: err.toString()})
    }
})

app.get('/delicatessen', async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({cuisine: 'delicatessen', city: {$ne: 'Brooklyn'}})
        res.send(restaurants)
    } catch(err) {
        console.log(err)
        res.status(500).send({error: err.toString()})
    }
})
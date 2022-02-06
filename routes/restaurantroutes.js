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

app.get('/seed', async (req, res) => {
    try {
        await restaurantModel.remove({})
        await restaurantModel.insertMany(
            [{
              "address": {
                "building": "1008",
                "street": "Morris Park Ave",
                "zipcode": "10462"
             },
             "city": "Bronx",
             "cuisine": "Bakery",
             "name": "Morris Park Bake Shop",
             "restaurant_id": "30075445"
            },
            {
              "address": {
                "street": "Thai Son Street",
                "zipcode": null
             },
             "city": "Manhattan",
             "cuisine": "Vietnamese",
             "name": "Pho Me Long Time",
             "restaurant_id": "30075455"
            },
            {
              "address": {
                "building": "253",
                "street": "East 167 Street",
                "zipcode": null
             },
             "city": "Bronx",
             "cuisine": "Chicken",
             "name": "Mom's Fried Chicken",
             "restaurant_id": "40382900"
            },
            {
              "address": {
                "building": "120",
                "street": "East 56 Street",
                "zipcode": "19800"
             },
             "city": "Mahattan",
             "cuisine": "Italian",
             "name": "Montebello Restaurant",
             "restaurant_id": "40397082"
            },
            {
              "address": {
                "building": "195",
                "street": "Soprano Street",
                "zipcode": "17500"
             },
             "city": "Staten Island",
             "cuisine": "Hamburgers",
             "name": "Joeys Burgers",
             "restaurant_id": "40397555"
            },
            {
              "address": {
                "building": "200",
                "street": "Queens Boulevard",
                "zipcode": "19700"
             },
             "city": "Queens",
             "cuisine": "American",
             "name": "Brunos on the Boulevard",
             "restaurant_id": "40397678"
            },
            {
              "address": {
                "building": "555",
                "street": "Sushi Street",
                "zipcode": "17700"
             },
             "city": "Brooklyn",
             "cuisine": "Japanese",
             "name": "Iron Chef House",
             "restaurant_id": "40397699"
            },
            {
              "address": {
                "building": "555",
                "street": "Fontana Street",
                "zipcode": null
             },
             "city": "Brooklyn",
             "cuisine": "Japanese",
             "name": "Wasabi Sushi",
             "restaurant_id": "40398000"
            },
            {
              "address": {
                "building": "900",
                "street": "Goodfellas Street",
                "zipcode": "17788"
             },
             "city": "Brooklyn",
             "cuisine": "Delicatessen",
             "name": "Sal's Deli",
             "restaurant_id": "40898000"
            },
            {
              "address": {
                "building": "909",
                "street": "44 Gangster Way",
                "zipcode": "17988"
             },
             "city": "Queens",
             "cuisine": "Delicatessen",
             "name": "Big Tony's Sandwich Buffet",
             "restaurant_id": "40898554"
            },
            {
              "address": {
                "building": "1201",
                "street": "121 Canolli Way",
                "zipcode": "17989"
             },
             "city": "Queens",
             "cuisine": "Delicatessen",
             "name": "The Godfather Panini Express",
             "restaurant_id": "40898554"
            }]
        )

        res.send(await restaurantModel.find({}))
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

module.exports = app
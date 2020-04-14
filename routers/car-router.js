const express = require('express');
const knex = require('knex');

const knexfile = require('../knexfile.js');

const db = knex(knexfile.development);

const router = express.Router();

// GET Request
router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Failed to retrieve Cars' });
        });
});

// GET ID Request
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars').where({ id }).first()
        .then(car => {
            res.json(car);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Failed to retrieve Car ID' });
        });
});

// POST Request
router.post('/', (req, res) => {
    const carsData = req.body;
    db('cars').insert(carsData)
        .then(ids => {
            db('cars').where({ id: ids[0] })
            .then(newCarEntry => {
                res.status(201).json(newCarEntry);
            });
        })
        .catch(error => {
            console.log('POST Error', error);
            res.status(500).json({ message: 'Failed to create new car data' });
        });   
    });

module.exports = router;
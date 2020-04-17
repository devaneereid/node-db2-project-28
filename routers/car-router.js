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

// PUT Request
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db('cars')
        .where({ id })
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(error => {
            console.log('PUT Error', error)
            res.status(500).json({ error: 'Failed to update Car ID' });
        });
});

// DELETE Request
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('cars')
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(error => {
            console.log('DELETE Error', error);
            res.status(500).json({ error: 'Failed to delete Car ID' });
        });
});

module.exports = router;
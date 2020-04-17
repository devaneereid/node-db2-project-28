const express = require('express');
const helmet = require('helmet');

const CarRouter = require('../routers/car-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', CarRouter);

server.get('/', (req, res) => {
    res.send({ message: 'API is up and running' });
});

module.exports = server;
const express = require('express');
const helmet = require('helmet');

const CarRouter = require(''); // add pathway once created

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', CarRouter);

module.exports = server;
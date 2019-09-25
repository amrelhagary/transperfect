'use strict';

const mongoose = require('mongoose'),
    config = require('../config/config.js').get(process.env.NODE_ENV);

// Setup mongodb
mongoose.Promise = global.Promise;
mongoose.set("debug", process.env.NODE_ENV !== 'prod' || false);

const db = mongoose.createConnection(config['database']['mongodb']);
db.on('error', console.error.bind(console, 'MongoDB Connection Error!'));
// db.on('open', () => console.log('MongoDB Connection Open!'));

module.exports = db;

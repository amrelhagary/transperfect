'use strict';

const db = require('../db/mongo');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileModel = new Schema({
    filename: String,
    originalname: String
});

module.exports = db.model('file', fileModel);

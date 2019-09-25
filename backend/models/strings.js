'use strict';

const db = require('../db/mongo');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stringsModel = new Schema({
    file_id: { type: Schema.Types.ObjectId, ref: 'file' },
    key: String,
    value: String
});

module.exports = db.model('string', stringsModel);
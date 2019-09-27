'use strict';

const db = require('../db/mongo');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileModel = new Schema({
    filename: String,
    originalname: String
});

exports.FileModel = db.model('file', FileModel);

exports.findAllFiles = () => {
    return new Promise((resolve, reject) => {
        module.exports.FileModel.find({}).then(resolve).catch(reject);
    });
}

exports.get = (fileId) => {
    return new Promise((resolve, reject) => {
        module.exports.FileModel.findById(fileId).then(resolve).catch(reject);
    });
}

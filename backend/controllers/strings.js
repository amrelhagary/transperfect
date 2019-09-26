'use strict';

const { createFileModel, handleLines } = require('../services/upload-service');
const FileModel = require('../models/files');
const StringsModel = require('../models/strings');
const mongoose = require('mongoose');
const stream = require('stream');

exports.uploadStringFile = async (req, res) => {
    const file = req.file;
    console.log(`upload string file ${req.file.filename}`)

    createFileModel(file)
        .then(fileObj => {
            handleLines(fileObj, (err, lines) => {
                if (err) { return res.send(err); };
                res.send(`no of line ${lines}`);
            });
        })

};

exports.downloadStringFile = async (req, res) => {
    const fileId = req.params.fileId;
    try {
        const strings = await StringsModel.downloadFile(fileId);
        res.json(strings);

    } catch (e) {
        console.log(e)
        res.status(500).send(e.toString());
    }
}

exports.downloadStringFileStream = async (req, res) => {
    const fileId = req.params.fileId;
    try {
        const cursor  = StringsModel.downloadFileStream(fileId);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        cursor.pipe(res);

    } catch (e) {
        console.log(e)
        res.status(500).send(e.toString());
    }
}


exports.getFiles = async (req, res) => {
    try {
        const files = await FileModel.findAllFiles();
        res.json(files);
    } catch (e) {
        res.status(500).send(e.toString());
    }

}

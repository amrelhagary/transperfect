'use strict';

const { createFileModel, handleLines } = require('../services/upload-service');
const FileModel = require('../models/files');
const StringsModel = require('../models/strings');
const fs = require('fs'), path = require('path');
const mime = require('mime');

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

exports.downloadStringFileJson = async (req, res) => {
    const fileId = req.params.fileId || null;
    try {
        const strings = await StringsModel.getStringsByFileId(fileId);
        const file = await FileModel.get(fileId);

        //TODO: cleanup the /tmp
        const filepath = path.basename('/tmp/' + file.filename);
        const wstream = fs.createWriteStream(filepath);

        wstream.write(JSON.stringify(strings));
        wstream.end();

        const mimetype = mime.lookup(filepath);

        res.setHeader('Content-disposition', 'attachment; filename=' + file.filename + '.json');
        res.setHeader('Content-type', mimetype);

        const rstream = fs.createReadStream(filepath, 'utf-8');
        rstream.pipe(res);
    } catch (e) {
        console.log(e)
        res.status(500).send(e.toString());
    }
}

exports.downloadStringFileTxt = async (req, res) => {
    const fileId = req.params.fileId || null;
    try {
        const strings = await StringsModel.getStringsByFileIdAsString(fileId);
        const file = await FileModel.get(fileId);

        //TODO: cleanup the /tmp
        const filepath = '/tmp/' + file.filename;
        fs.writeFileSync(filepath, strings.join('\n'), 'utf-8');
        const mimetype = mime.lookup(filepath);

        res.setHeader('Content-disposition', 'attachment; filename=' + file.filename + '.txt');
        res.setHeader('Content-type', mimetype);
        const rstream = fs.createReadStream(filepath, 'utf-8');
        rstream.pipe(res);
    } catch (e) {
        console.log(e)
        res.status(500).send(e.toString());
    }
}

exports.downloadStringFileStream = async (req, res) => {
    const fileId = req.params.fileId;
    try {
        const cursor = StringsModel.getFileStream(fileId);
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

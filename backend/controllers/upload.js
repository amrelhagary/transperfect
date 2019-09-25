'use strict';
const StringsModel = require('../models/strings');
const readline = require('../libs/readline');
const path = require('path');

exports.uploadStringFile = async (req, res) => {
    const filename= path.join(__dirname, `/../uploads/${req.file.filename}`);
    console.log(filename, `upload string file ${req.file.filename}`)

    readlines(filename, (err, lines) => {
        if (err) {
            return res.sendStatus(500).send(err.toString());
        }
        res.send(`no of lines ${lines}`);
    });
};

function readlines(filename, cb) {
    const rl = readline(filename);
    let lines = 0

    rl.on('line', (line) => {
        try {
            let row = line.split('=', 2).map(t => t.replace(/\s+|\"+|\;/g, '')).filter(s => s != "");
            if (row.length == 0) {
                return;
            }

            let str  = new StringsModel({
                key: row[0],
                value: row[1]
            });

            str
                .save()
                .then(() => {
                    rl.resume();
                })
                .catch((err) => {
                    console.log('Error writing obj to DB at line %s: %s', lines, err.toString())
                    cb(err, null);
                });       
        } catch (e) {
            console.log('Error parsing file at line %s: %s', lines, e.toString())
            cb(e, null);
        };
        
        lines++;
        console.log('Read %s lines.', lines)
    });

    rl.on('close', () => {
        cb(null, lines);
    });
}

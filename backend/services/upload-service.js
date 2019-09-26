const StringsModel = require('../models/strings'), FileModel = require('../models/files');
const readline = require('../libs/readline');
const path = require('path');

exports.createFileModel = (file) => {
    const fileObj = new FileModel({
        filename: file.filename,
        originalname: file.originalname
    });

    return fileObj.save();
}

exports.handleLines = (file, cb) => {
    const filename= path.join(__dirname, `/../uploads/${file.filename}`);
    const rl = readline(filename);
    let lines = 0

    rl.on('line', (line) => {
        try {
            let row = line.split('=', 2).map(t => t.replace(/\s+|\"+|\;/g, '')).filter(s => s !== "");
            if (row.length === 0) {
                return;
            }

            let str  = new StringsModel({
                file_id: file._id,
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

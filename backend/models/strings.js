'use strict';

const db = require('../db/mongo');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StringsModel = new Schema({
    file_id: { type: Schema.Types.ObjectId, ref: 'file' },
    key: String,
    value: String
});

// module.exports = db.model('string', StringsModel);
exports.StringsModel = db.model('string', StringsModel);

exports.getStringsByFileId = (fileId) => {
    return new Promise((resolve, reject) => {
        module.exports.StringsModel.find({ "file_id": mongoose.Types.ObjectId(fileId) }, { key: true, value: true }).then(data => {
            const dd = data.map(d => {
                let k = d.key;
                let v = d.value;
                let o = {}
                o[k] = v;
                return o;
            });

            resolve(dd);
        }).catch(reject);
    })
}

exports.getStringsByFileIdAsString = (fileId) => {
    return new Promise((resolve, reject) => {
        module.exports.StringsModel.find({ "file_id": mongoose.Types.ObjectId(fileId) }, { key: true, value: true }).then(data => {
            const dd = data.map(d => {
                return `"${d.key}"="${d.value}"`;
            });

            resolve(dd);
        }).catch(reject);
    })
}

exports.getFileStream = (fileId) => {
    return module.exports.StringsModel.find({ "file_id": mongoose.Types.ObjectId(fileId) }, { key: true, value: true }).cursor({transform: JSON.stringify});
}

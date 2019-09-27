const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const stringsController = require('../../controllers/strings');
router.post('/upload',  upload.single('file'), stringsController.uploadStringFile);
router.get('/download/:fileId/json', stringsController.downloadStringFileJson);
router.get('/download/:fileId/txt', stringsController.downloadStringFileTxt);
router.get('/file/:fileId', stringsController.downloadStringFileStream);
router.get('/files', stringsController.getFiles)

module.exports = router;

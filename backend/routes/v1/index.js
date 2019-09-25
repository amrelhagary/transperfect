const router = require('express').Router();

router.use('/upload', require('./upload'));
router.use('/download', require('./download'));

module.exports = router;
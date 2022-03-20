const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.use('/api', require('./controllers/tx'));

module.exports = router;
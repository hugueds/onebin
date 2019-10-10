const router = require('express').Router();

router.get('/', (req, res, next) => res.sendFile('index.html'));

module.exports = router;
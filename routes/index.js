const express = require('express');
const router = express.Router();
router.use('/', require('./swagger')); // Assuming .swagger is in the same directory

// Example route
router.get('/', (req, res) => {
    //#swagger.tags=['hello world!']
    res.send('Hello World!');});

 router.use('/users',require('./users'));
 
 module.exports = router;
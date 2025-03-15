const express = require('express');
const router = express.Router();
router.use('/', require('./swagger')); // Assuming .swagger is in the same directory

// Example route
router.get('/', (req, res) => {
    //#swagger.tags=['hello world!']
    res.send('Hello World!');});

 router.use('/users',require('./users'));
 

// Define the route for GET /users
router.get('/users', (req, res) => {
    // Example response - you can replace this with actual database query
    res.json({ message: 'Users route is working!' });
});



 
 module.exports = router;
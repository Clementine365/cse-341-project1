const express = require('express');
const router = express.Router();

// Ensure the correct import for userscontroller
const usersController = require('../controllers/users'); // Make sure to match the correct file name and path

// Define routes
router.get('/', usersController.getAll);       // Get all users
router.get('/:id', usersController.getSingle); // Get a single user by id
router.post('/', usersController.createUser);  // Create a new user
router.put('/:id', usersController.updateUser); // Update a user by id
router.delete('/:id', usersController.deleteUser); // Delete a user by id

// Export the router
module.exports = router;



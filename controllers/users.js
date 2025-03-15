const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

// Get all users
const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase(); // Get the database instance
        const result = await db.collection('users').find().toArray(); // Use the database instance to query
        res.setHeader('content-type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
};

// Get a single user by ID
const getSingle = async (req, res) => {
    //#swagger.tags=['User']
    try {
        const userId = new ObjectId(req.params.id); // Convert the ID to ObjectId
        const db = mongodb.getDatabase(); // Get the database instance
        const result = await db.collection('users').find({ _id: userId }).toArray(); // Query for the user

        if (result.length > 0) {
            res.setHeader('content-type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching the user", error: err });
    }
};

// Create a new user
const createUser = async (req, res) => {
    //#swagger.tags=['User']
    try {
        const user = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            ipaddress: req.body.ipaddress,
        };

        const response = await mongodb.getDatabase().collection('users').insertOne(user); // Use insertOne instead of insertOnse
        if (response.acknowledged) {
            res.status(201).json({
                message: 'User created successfully',
                userId: response.insertedId
            });
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
};

// Update an existing user and return updated data
async function updateUser(req, res) {
    //#swagger.tags=['User']
    const userId = req.params.userId;
    const updatedData = req.body;

 try {
        const db = await mongodb.getDatabase(); // Assuming this is correct and it returns a MongoDB client
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId }, user);

            updatedData
        ;

        if (result.modifiedCount > 0) {
            res.status(200).send('User updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal server error');
    }
}


// Delete a user
const deleteUser = async (req, res) => {
    //#swagger.tags=['User']
     try {
        const userId = new ObjectId(req.params.id); // Convert the ID to ObjectId
        const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId }); // Use deleteOne 

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};

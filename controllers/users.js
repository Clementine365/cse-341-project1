const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

// Get all users
const getAll = async (req, res) => {
    const db = mongodb.getDatabase(); // Get the database instance
    const result = await db.collection('users').find(); // Use the database instance to query
    result.toArray().then((users) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(users);
    }).catch((err) => {
        res.status(500).json({ message: "Error fetching users", error: err });
    });
};

// Get a single user by ID
const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id); // Convert the ID to ObjectId
    const db = mongodb.getDatabase(); // Get the database instance
    const result = await db.collection('users').find({ _id: userId }).toArray(); // Query for the user

    if (result.length > 0) {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(result[0]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getAll,
    getSingle
};


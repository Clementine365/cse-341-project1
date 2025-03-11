const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initdb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }

    // Connect to MongoDB without deprecated options
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(); // Get the database instance
            console.log('Database connected successfully');
            callback(null, database);
        })
        .catch((err) => {
            console.log('Database connection failed:', err);
            callback(err);
        });
};

// Return the database instance
const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initdb,
    getDatabase
};

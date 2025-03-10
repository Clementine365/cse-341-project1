const express = require('express');

// Correct the path to the 'database' module
const mongodb = require('./data/database');  // Fixed path
const app = express();

const port = process.env.PORT || 3000;

// Use the router from routes.js
app.use('/', require('./routes'));

mongodb.initdb((err) => {
    if(err){
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Database is connected and Node is running on port ${port}`);
        });
    }
});

const express = require('express');
const bodyParser =require('body-parser')
const cors = require('cors');
const mongodb = require('./data/database');  // Fixed path
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3001;



app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Accee-Control-Allow-Origin', '"');
    res.setHeader(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept,Z-Key'
    );
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
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




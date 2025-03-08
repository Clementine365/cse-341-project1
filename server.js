const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


// Use the router from routes.js
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
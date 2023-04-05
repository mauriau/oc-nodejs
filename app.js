const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({message: 'Hello World with express !'})
});



module.exports = app;
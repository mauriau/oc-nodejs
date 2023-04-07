const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

dotenv.config();

mongoose.connect('mongodb+srv://' + process.env.DB_USER +':'+ process.env.DB_PASSWORD + '@cluster0.tnvqqls.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// can extract request
app.use(express.json());
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
// add CORS
app.use((req, res, next) => {
    // Allow access to API
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allow some headers on request
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Allow some methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


module.exports = app;
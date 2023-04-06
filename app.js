const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const Thing = require('./models/Thing');

dotenv.config();

mongoose.connect('mongodb+srv://' + process.env.DB_USER +':'+ process.env.DB_PASSWORD + '@cluster0.tnvqqls.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// can extract request
app.use(express.json());

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

// POST request must be before get request, because get catch the request before post
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({error}))
    ;
})

app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({
        _id: req.params.id,

    }, {...req.body, _id: req.params.id})
        .then(thing => res.status(200).json({message: 'objet modifié'}))
        .catch(error => res.status(400).json({error}));
});


app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
})

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}))
});



module.exports = app;
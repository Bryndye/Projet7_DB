const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();
const dbuser = process.env.USER;
const dbpassword = process.env.PASSWORD;

mongoose.connect(`mongodb+srv://${dbuser}:${dbpassword}@cluster0.lul6yyy.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json()); // intercepte req qui contiennent du json dans req.body (bodyparser be like)


// INIT REQ HEADER
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const webRoutes = require('./routes/web');
app.use('/api', webRoutes);

const path = require('path');
app.use('/images',express.static(path.join(__dirname, 'images')));

module.exports = app;
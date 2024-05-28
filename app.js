require('dotenv').config();

const express = require('express');
var session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const storyRoutes = require('./routes/story');
const userRoutes = require('./routes/user');
const frontRoutes = require('./routes/front');

const app = express();

mongoose.connect(process.env.MONGOOSE,
  { })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());//pour utiliser req.body au format JSON
app.use('/public', express.static(__dirname + '/public'));

//permet déviter l'erreur CORS entre 2 serveurs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next();
});

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api/story', storyRoutes);
app.use('/api/auth', userRoutes);
app.use('/', frontRoutes);


module.exports = app;

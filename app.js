const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser =require('body-parser');
const cors = require('cors');

// const mongoose = require('mongoose');
// mongoose.set('debug', true);

const productsRoutes = require('./routes/products');
const {appConfig} = require('./config');

// const debug = require('debug')('back');
// debug('Este es un mensaje de depuración');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/public', express.static(`${__dirname}/storage/imgs`));

app.use(session({
    secret: `${appConfig.secret}`,
    resave: false,  //evita guardar en la sesión si no se ha actualizado
    cookie: {expires: new Date (Date.now()  + 7 * 24 * 60 * 60 * 1000 )},
    saveUninitialized: false,   //guarda una cookie sin valor inicial
}))

app.use('/api', productsRoutes);

module.exports = app;
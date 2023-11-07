const mongoose = require('mongoose');
const { appConfig } = require('../config');
const timestamp = require('mongoose-timestamp');

const MODEL_NAME = 'Product'; // Cambiado a 'Product' con mayúscula inicial
const IMAGE_PATH = '/public/';

const productSchema = new mongoose.Schema({
    articulo:{
type: String,
required: true,
trim: true // Elimina espacios en blanco alrededor del valor    
}, 
   modelo: {
    type: String,
    required: true,
    trim: true // Elimina espacios en blanco alrededor del valor    
    },  
    descripcion: String,
    precio: Number,
    stock: {
        type: Number,
        min: 0, // Precio debe ser mayor o igual a cero
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} must be an integer'
        }
    },
    imagen: String
});

productSchema.plugin(timestamp);

productSchema.methods.setImagen = function setImagen(filename) {
    const { host, port } = appConfig;
    this.imagen = `${host}:${port}${IMAGE_PATH}${filename}`;
};

const Product = mongoose.model(MODEL_NAME, productSchema);

module.exports = Product;

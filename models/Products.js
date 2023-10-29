const mongoose = require('mongoose');
const { appConfig } = require('../config');
const timestamp = require('mongoose-timestamp'); // Importa el módulo mongoose-timestamp

const productSchema = new mongoose.Schema(
    {
        articulo: String,
        modelo: String,
        descripcion: String,
        precio: Number,
        stock: { type: Number, integer: true }, // Número entero sin decimales
        imagen: String
    }
);

productSchema.plugin(timestamp); // Agrega el plugin mongoose-timestamp al esquema

productSchema.methods.setImagen = function setImagen(filename) {
    const { host, port } = appConfig;
    this.imagen = `${host}:${port}/public/${filename}`;
};

const Product = mongoose.model('product', productSchema);

module.exports = Product;

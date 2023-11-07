const express = require('express');
const api = express.Router();
const upload = require('../libs/storage');

const { addProduct, getProducts, findProducts, updateProducts, deleteProducts} = require('../controllers/productsController');

api.get('/products', getProducts);
api.post('/products', upload.single('imagen'), addProduct);
api.get('/products/:id', findProducts);
api.put('/products/:id', upload.single('imagen'), updateProducts); // Cambié 'Products' a 'products'
api.delete('/products/:id', deleteProducts);


module.exports = api;

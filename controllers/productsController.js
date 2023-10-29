const  Product= require('../models//Products');

async function addProduct(req, res){
    try{
        const {articulo, modelo, descripcion, precio,stock,imagen} = req.body;

        const product = Product({
            articulo,
            modelo,
            descripcion,
            precio,
            stock,
            imagen
            
        });

        if(req.file){
            const { filename } = req.file;
            product.setImagen(filename);
        }

        const products = await product.save();
        res.status(201).send({ products })
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getProducts(req, res) {
    try{
        const products= await Product.find();
        res.status(200).send({products});
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function findProducts (req, res){
    try{
    const products= await Product.findById(req.params.id)
    res.status(200).send({products})
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function updateProducts(req, res){
    try{
        const products= await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).send({products})
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function deleteProducts(req, res){
    try{
        const product= await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).send({ message: 'producto no encontrado' });
        }
        res.status(200).send({message: 'producto eliminado exitosamente'});
    }
    catch (e) {
        res.status(500).send({message: e.message})
    }
}
async function findProductsByLanguage(req, res) {
    try {
        const { articulo } = req.query; // Lee el idioma desde los parámetros de consulta

        if (!articulo) {
            return res.status(400).send({ message: 'Debes proporcionar un articulo para buscar productos.' });
        }

        const products= await Product.find({  });
        
        if (products.length === 0) {
            return res.status(404).send({ message: 'No se encontraron productos para el articulo proporcionado.' });
        }

        res.status(200).send({ products});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al buscar productos por articulo ' });
    }
}
module.exports = {addProduct, getProducts, findProducts, updateProducts, deleteProducts,findProductsByLanguage};

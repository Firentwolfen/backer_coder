const { Router } = require('express');
const router = Router();
const Producto = require("../ProductManager");
const producto = new Producto(__dirname+"/products.json");

router.get('/', async(req,res)=>{
 
    let {limit} = req.query

    let productos = await producto.getProducts();

     if (!limit){

        res.status(200).json(productos);

    } else {
        var arrlimitada = productos.slice(0, parseInt(limit));
        res.status(200).json({
            msg : `Estos son los primeros ${limit} productos` ,    
            productos:arrlimitada
        }) 

    }

});
router.get('/:pid', async(req,res)=>{
 
    let productId = parseInt(req.params.pid)
    
    let response = await producto.getProductsById(productId);
    
    res.status(200).json(response)  
});

router.post('/', async(req,res)=>{
 
    const {code,title,description,price, stock,category,thumbnails} = req.body
    
    let response = await producto.addProduct({code,title,description,price,stock,category,thumbnails});
    
    res.status(200).json(response)  
});

router.put('/:pid', async(req,res)=>{
 
    let productId = parseInt(req.params.pid)

    const valoresaactualizar = req.body

    let response = await producto.updateProduct(productId,valoresaactualizar);
    
    res.status(200).json(response)  
});

router.delete('/:pid', async(req,res)=>{
 
    let productId = parseInt(req.params.pid)
    
    let response = await producto.deleteProduct(productId);
    
    res.status(200).json(response)  
});




module.exports = router;
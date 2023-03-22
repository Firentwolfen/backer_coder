const express = require('express');
const router=express.Router();
const Producto = require("../ProductManager");
const producto = new Producto("./routers/products.json");

router.get('/',async (req,res)=>{
    
    let productos = await producto.getProducts();

    res.render('home.handlebars',{
productos, titulo:'Lista de productos'
    })
})

router.get('/realtimeproducts',async(req,res)=>{
    
    res.render('realTimeProducts',{
    titulo:'Agregar/Eliminar productos'
    })
})

module.exports = router;
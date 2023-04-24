const express = require('express');
const router = express.Router();
const Producto = require("../ProductManager");
const privateAccess = require('../middlewares/privateAccess.middleware');
const publicAccess = require('../middlewares/publicAccess.middleware');
const producto = new Producto("./routers/products.json");


router.get('/', privateAccess,(req,res)=>{
    
const usuario = req.session.user

console.log(usuario);

res.render('profile.handlebars',{usuario})

    /*let productos = await producto.getProducts();

    res.render('home.handlebars',{
productos, titulo:'Lista de productos'
    })*/
})

router.get('/login',publicAccess, (req,res)=>{
    
    res.render('login.handlebars',{ titulo:'Formulario de Ingreso' })
})

router.get('/signup',publicAccess,(req,res)=>{
    
    res.render('signup.handlebars',{
titulo:'Formulario de Creacion'
    })
})

router.get('/realtimeproducts',async(req,res)=>{
    
    res.render('realTimeProducts',{
    titulo:'Agregar/Eliminar productos'
    })
})



module.exports = router;
const { Router } = require('express');
const router = Router();
const Carrito = require("../CartManager");
const carrito = new Carrito(__dirname+"/carts.json");

router.get('/:cid', async(req,res)=>{
 
    let cartId = parseInt(req.params.cid)
    
    let response = await carrito.getCartContentById(cartId);
    
    res.status(200).json(response)  
});

router.post('/', async(req,res)=>{
    
    let response = await carrito.addCart();
    
    res.status(200).json(response)  
});

router.post('/:cid/product/:pid', async(req,res)=>{
 
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);

    const {quantity} = req.body

    let response = await carrito.updateCart(cartId,productId,quantity);
    
    res.status(200).json(response)  
});

router.get('/', async(req,res)=>{

    let carros = await carrito.getCarts();

        res.status(200).json(carros);

});

module.exports = router;
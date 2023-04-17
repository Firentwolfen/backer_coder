const { Router } = require('express');
const router = Router();
const Carrito = require("../CartManager");
const Carritos = require('../models/carts.model');
const Productos = require('../models/productos.model');
const carrito = new Carrito(__dirname+"/carts.json");

router.get('/', async(req,res)=>{

    //Mongoose
    
try {
    const carros = await Carritos.find({ status: true }).populate('productoscarro.product.productos');

if (carros.length != 0) {

          res.status(200).json(carros);

} else {s
   
    res.status(404).json({msg:"Actualmente no hay carros de compras. Favor de ingresar productos a un carro",
    carros

});
}
    
} catch (error) {
    console.log(error);
}


    /*sin Mongo
    let carros = await carrito.getCarts();

        res.status(200).json(carros);
*/
});

router.get('/:cid', async(req,res)=>{
 
    let cartId = req.params.cid
     
    try {

        let response = await Carritos.findById(cartId).populate('{productoscarro.product}.productos');
    
    if (response!== null) {
        
        res.status(200).json({
            msg : `Este es el carrito con el id: ${cartId}` ,    
            carro:response
        });
    } else {
        res.status(404).json({msg:"No found it. El carro solicitado no existe"});
    }
    
    } catch (error) {

        console.log(error);    
    
    }

    /* sin Mongo
    let response = await carrito.getCartContentById(cartId);
    
    res.status(200).json(response)  */
});

router.post('/', async(req,res)=>{
   
    try {
        const carros = await Carritos.create({status:true});

        res.status(200).json({
            msg: "El carro ha sido creado", 
        })
    
    } catch (error) {
        console.log(error);
    }
   
    

        
        /*
        let response = await carrito.addCart();
        
        res.status(200).json({
            msg: "El carro ha sido creado", 
            carritoCreado
        })  */
    });

router.post('/:cid/product/:pid', async(req,res)=>{
 
    let cartId = req.params.cid;
    let productId = req.params.pid;

    const {quantity} = req.body

    try {

        if (!cartId || !productId || !quantity ) {
            return res.send({status:"error", msg: `Todos los campos son obligatorios, favor de ingresar la informacion correctamente`});
          } else {
    
        let carritoactualizar = await Carritos.findOne({_id: cartId});
        let productoagregar = await Productos.findOne({_id: productId, status: true} );
        let productosActuales = carritoactualizar.productoscarro;
        
        if (carritoactualizar!==null) {
            
            if (productoagregar!==null) {
        
                
//

                carritoactualizar.productoscarro.push({product:productId,quantity});
                
                
  //              
                let resulcarro = await Carritos.updateOne({_id: cartId}, carritoactualizar);
                let resulstock = await Productos.updateOne({_id: productId}, {stock:stocknuevo} );
         
                res.status(201).json({
                    msg: "El producto ha sido agregado", 
                    carrito:resulcarro,
                });
             } else {
                 res.status(404).json({msg:"No found it. El producto a modificar no existe"});
             }

        } else {
            res.status(404).json({msg:"No found it. El carrito a modificar no existe"});
        }
        
    } 

    } catch (error) {
        console.log(error);
    }

/*
    let response = await carrito.updateCart(cartId,productId,quantity);
    
    res.status(200).json(response) */ 
});


module.exports = router;
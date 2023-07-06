const { Router } = require('express');
const router = Router();
const Carrito = require("../CartManager");
const Carritos = require('../models/carts.model');
const Productos = require('../models/productos.model');
const current = require('../middlewares/current.middelware');
const ProductDTO = require('../DTO/product.dto');
const carrito = new Carrito(__dirname+"/carts.json");

router.get('/', async(req,res)=>{

    //Mongoose
    
try {
    const carros = await Carritos.find({ status: true }).populate('productos.product');

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

        let response = await Carritos.findById(cartId).populate('productos.product');
    
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

router.put('/:cid', async (req, res) => {
        try {
          const { productos } = req.body;
          const carrito = await Carritos.findById(req.params.cid).exec();
      
          if (!carrito) {
            return res.status(404).json({ msg: 'No found it. El carrito no existe' });
          }
      
          for (const producto of productos) {
            const productoBD = await Productos.findById(producto.product).exec();
            if (!productoBD) {
              return res.status(404).json({ msg: `No found it. El producto con ID ${producto.product} no existe` });
            }
            productoBD.stock -= producto.quantity;
            await productoBD.save();
          }
      
          carrito.productos = productos;
          await carrito.save();
      
          res.status(200).json({
            status: 'success',
            payload: carrito.productos,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: 'Hubo un error al actualizar el carrito' });
        }
      });

router.put('/:cid/products/:pid', async(req,res)=>{
 
    let cartId = req.params.cid;
    let productId = req.params.pid;

    const {quantity} = req.body
    
    if (!cartId) {
        return res.send({status:"error", msg: `Todos los campos son obligatorios, favor de ingresar la informacion correctamente`});
      } else {
        try {
          
            let carrito = await Carritos.findById(cartId).select('productos').exec();
            if (carrito === null) {
                return res.status(404).json({msg: "No se encontró el carrito"});
            }
        
            let producto = await Productos.findById(productId).select('stock').exec();
            if (producto === null) {
                return res.status(404).json({msg: "No se encontró el producto"});
            }

            if (producto.stock < quantity) {
                return res.status(400).json({msg: "No hay suficiente stock del producto"});
            }
        
            let index = carrito.productos.findIndex(producto => producto.product.toString() === productId);
            if (index !== -1) {
                
                carrito.productos[index].quantity += quantity;
            } else {
                
                carrito.productos.push({product: productId, quantity});
            }

            producto.stock -= quantity;
            await producto.save();
        
            let result = await carrito.save();
            res.status(201).json({
                msg: "El producto ha sido agregado", 
                carrito: result
            });
        } catch (error) {
            res.status(500).json({msg: "Error al agregar el producto al carrito", error: error.message});
        }
    
    


/*
    let response = await carrito.updateCart(cartId,productId,quantity);
    
    res.status(200).json(response) */ 
}
});

router.delete('/:cid', async(req,res)=>{
    
    let cartId = req.params.cid
    
    try {
        let carrito = await Carritos.findById(cartId).exec();
        
        if (carrito) {
            carrito.productos = [];
            await carrito.save();
    
            res.status(202).json({
                msg: "Todos los productos han sido eliminados del carrito",
            });
        } else {
            res.status(404).json({msg:"No found it. El carrito a modificar no existe"});
        }
            
    } catch (error) {
        console.log(error);    
    }

});

router.delete('/:cid/products/:pid', async(req,res)=>{

    let cartId = req.params.cid
    let productId = req.params.pid
    
    try {

        let carrito = await Carritos.findById(cartId).exec();
    
    if (carrito) {
        

        let productosActuales = carrito.productos
        
       if (productosActuales.length == 0) {
           return res.status(404).json({msg:"No found it. El producto a eliminar no existe en el carrito"});
        } 
         
        let listanueva = productosActuales.filter(producto => {
            return !producto.product.equals(productId);
        });

       carrito.productos = listanueva;
       await carrito.save();

        res.status(202).json({
            msg: "El producto ha sido eliminado",
        });
    } else {
        res.status(404).json({msg:"No found it. El producto a eliminar no existe"});
    }
        
    } catch (error) {
        
        console.log(error);    
            
    }


    /*sin mongo db
    
    let response = await producto.deleteProduct(productId);
    
    res.status(200).json(response) */ 
});

//TODO ahcer que funcione
router.post('/:cid/purchase',async(req,res)=>{
   
   try {
    let cartId = req.params.cid;
    let usermail = req.session.email;
    let {productList} = req.body;
    
    if (!cartId) {
        return res.send({status:"error", msg: `Todos los campos son obligatorios, favor de ingresar la informacion correctamente`});
      } 
          
            //TODO 
 if (req.user.role !== 'user'|| !usermail) {
    return res.status(403).json({
      status: 'error',
      msg: 'Solo un usuario puede agregar productos al carro'
    });
  }

  const listaCompra = ProductDTO(productList);

  current(usermail,listaCompra)

   } catch (error) {
    res.status(500).json({msg: "Error", error: error.message});
   }
   
   
    
    



           
        
            

           

           
       
    


/*
    let response = await carrito.updateCart(cartId,productId,quantity);
    
    res.status(200).json(response) */ 

    });
module.exports = router;
const { Router } = require('express');
const router = Router();
const Producto = require("../ProductManager");
const Productos = require('../models/productos.model');
const producto = new Producto(__dirname+"/products.json");

router.get('/', async(req,res)=>{
    let limit= parseInt(req.query.limit) ?? 10 ;
    let sort= req.query.sort ?? 'asc';
    let query= req.query.query ?? undefined;
    let page = parseInt(req.query.page) ?? 1

    //Mongoose
    
try {

    const options = {
        page,
        limit,
        sort,
        status:true,
      };
    const productos = await Productos.paginate({},options)

if (productos.length != 0) {
    
    let prevLink = productos.hasPrevPage?`http://localhost:8080/students?page=${productos.prevPage}`:null;
    let nextLink = productos.hasNextPage?`http://localhost:8080/students?page=${productos.nextPage}`:null;
    let isValid= !(page<=0||page>productos.totalPages)
    
       // var arrlimitada = productos.slice(0, parseInt(limit));
        res.status(200).json({   
        productos,
        prevLink,
        nextLink,
        isValid
        }) 

    } else {
   
    res.status(404).json({msg:"Actualmente no cuentas con productos ingresados. Favor de ingresar los productos al sistema",
    productos

});
}
    
} catch (error) {
    console.log(error);
}

    /*sin el MongoBd
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
*/
});


router.get('/:pid', async(req,res)=>{
    
    let productId = req.params.pid

    try {

    let response = await Productos.findById(productId).exec();

if (response!==null) {
    
    res.status(200).json({
        msg : `Este es el producto con el id: ${productId}` ,    
        response
    });
} else {
    res.status(404).json({msg:"No found it. El producto solicitado no existe"});
}
    
} catch (error) {
    
    console.log(error);    
    if (error.code===11000) {
        res.status(404).json({
        msg: `El codigo ${code} que esta ingresando se encuentra usado por otro producto, favor de utilizar otro`
        })   
    }

}
    


   
  /*sin el Mondo Bd
    let productId = parseInt(req.params.pid)
    
    let response = await producto.getProductsById(productId);
    
    res.status(200).json(response)  */
});

router.post('/', async(req,res)=>{

    const {code,title,description,price,stock,category,thumbnails} = req.body

try {
    if (!title || !description || !price || !category || !code || !stock) {
        return res.send({status:"error", msg: `Todos los campos son obligatorios, favor de ingresar la informacion correctamente`});
      } else {
//sin MgDb let response = await producto.addProduct({code,title,description,price,stock,category,thumbnails});

let response = await Productos.create({code,title,description,price,stock,category,thumbnails});
    
res.status(201).json({
    msg: "El producto ha sido agregado", 
    product:response,
})}  

} catch (error) {
    console.log(error);    
    if (error.code===11000) {
        res.status(400).json({
        msg: `El codigo ${code} que esta ingresando se encuentra usado por otro producto, favor de utilizar otro`
        })   
    }

}

    
});

router.put('/:pid', async(req,res)=>{

    let productId = req.params.pid

    const valoresaactualizar = req.body
 
    try {

        let response = await Productos.findById(productId).exec();
    
    if (response!==null) {
        
       let resulupdate = await Productos.updateOne({_id: productId},valoresaactualizar)

        res.status(202).json({
            msg: "El producto ha sido modificado",
            
        });
    } else {
        res.status(404).json({msg:"No found it. El producto a modificar no existe"});
    }
        
    } catch (error) {
        
        console.log(error);    
            
    }


    /*sin mongo

    let response = await producto.updateProduct(productId,valoresaactualizar);
    
    res.status(200).json(response) */ 
});

router.delete('/:pid', async(req,res)=>{
    
    let productId = req.params.pid
    
    try {

        let response = await Productos.findById(productId).exec();
    
    if (response!==null) {
        
       let resuldelete = await Productos.updateOne({_id: productId},{status:false})

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




module.exports = router;
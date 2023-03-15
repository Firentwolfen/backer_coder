const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');

process.env.PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :response-time'));

app.use('/api/products/',productsRouter)
app.use('/api/carts/',cartsRouter)

//endpoints
/*app.get('/products',async(req,res)=>{
 
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

})

app.get('/products/:pid', async(req,res)=>{
 
let productId = parseInt(req.params.pid)

let response = await producto.getProductsById(productId);

res.status(200).json(response) 

})*/



//
app.listen( process.env.PORT, () => {
    console.log('corriendo en el PORT', process.env.PORT);
} );

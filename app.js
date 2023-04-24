const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

const app = express();

const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');
const usersRouter = require('./routers/users.router');
const authRouter = require('./routers/auth.router');
const viewsRouter = require('./routes/views.router.js');
const {Server} = require('socket.io');
const Producto = require("./ProductManager");
const dbConnect = require('./db/indexmngdb');
const producto = new Producto("./routers/products.json");

process.env.PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :response-time'));
app.use(cookieParser())
app.use(
   session({
store: MongoStore.create({
mongoUrl: 'mongodb+srv://aespinozaservicios:Vf1mE8DMrp8ualxD@cluster0.wzh9fgf.mongodb.net/?retryWrites=true&w=majority',
mongoOptions:{useNewUrlParser: true,useUnifiedTopology:true},
ttl:60,
}),

secret: 'coderSecret',
resave:true,
saveUninitialized:true,
}) 
)

//Routers
app.use('/api/products/',productsRouter)
app.use('/api/carts/',cartsRouter)
app.use('/users',usersRouter)
app.use('/auth',authRouter)

//MondoDb
dbConnect();

//Servidor
const httpServer = app.listen( process.env.PORT, () => {console.log('corriendo en el PORT', process.env.PORT);});

const io = new Server(httpServer);

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/',viewsRouter);

//sockets
io.on('connection',socket=>{

//console.log('nuevo cliente conectado')

socket.on('msg',data=>{
console.log(data)
})

socket.on('agregarProducto',async(product)=>{

   const code = parseInt(product.code);
   const title = product.title;
   const description = product.description;
   const price = parseInt(product.price);
   const stock= parseInt(product.stock);
   const category=product.category;
   const thumbnails=product.thumbnails;
   
   //hacer que suba el producto
let newproduct = await producto.addProduct({code,title,description,price,stock,category,thumbnails});
let arr = await producto.getProducts();
console.log(newproduct.msg)
 io.emit('actualizacionLista',{arr, newproduct, status:1})
})

socket.on('eliminarProducto',async(product)=>{
    const id = parseInt(product.id)
    //hacer que elimine el producto
    let productos = await producto.deleteProduct(id);
    let arr = await producto.getProducts();
    console.log(productos.msg);
      io.emit('actualizacionLista',{arr, id, status:0})
   })

})
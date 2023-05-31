const productsRouter = require('./products.router');
const cartsRouter = require('./carts.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');

const router = app => {
//Routers
app.use('/api/products/',productsRouter)
app.use('/api/carts/',cartsRouter)
app.use('/users',usersRouter)
app.use('/auth',authRouter)
  }
  
module.exports = router
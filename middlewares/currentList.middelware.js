const { findProductId, updateProduct } = require('../services/product.services');
const { createticket, getAllTickets } = require('../services/ticket.services');

async function currentList(req,res,next) {
    const { items } = req.body;
    const total = 0;
    if (!items) {
      return res.status(400).json({ error: 'Datos del carrito de compras inválidos' });
    }
  
    // Verificar el stock de los productos en la base de datos
    const productosSinStock = [];
    items.forEach(item => {
      const productoEnDB = consultarProductoEnDB(item.id);
      if (!productoEnDB || productoEnDB.stock < item.cantidad) {
        productosSinStock.push(item);
      } else {
        // Actualizar el stock en la base de datos
        actualizarStockProducto(item.id, item.cantidad);
      }
    });
  
    if (productosSinStock.length > 0) {
      // Algunos productos no tienen suficiente stock
      const mensajeError = `Los siguientes productos no tienen suficiente stock: ${productosSinStock.map(p => p.nombre).join(', ')}`;
      return res.status(400).json({ error: mensajeError });
    }
  
const cantidadtickets = await getAllTickets();

const nroticket = cantidadtickets.length()+1;

const newpurchaseticket = {
code: nroticket,
purchaser: req.session.user.email,
purchase_datetime: new Date(),
amount: total,
}
    // Procesar el pago y generar el ticket de compra
    const ticket = generarTicketCompra(newpurchaseticket);
    // Aquí podrías hacer otras tareas como enviar notificaciones, actualizar el historial de compras, etc.
  
    res.json({ ticket: ticket });
  
    next();

}
   
  // Funciones simuladas para consultar y actualizar la base de datos
  async function consultarProductoEnDB(id) {
    // Realiza la consulta en la base de datos y retorna el producto encontrado
    // Si no se encuentra el producto, retorna null
    // Por simplicidad, aquí se utiliza una función simulada
    
    const productoencontrado = await findProductId(id)

    return productoencontrado;
  }
  
  async function actualizarStockProducto(id, cantidad) {
    // Realiza la actualización del stock en la base de datos
    
    const productoaactualizar = await findProductId(id)
    
    const stocknuevo = productoaactualizar.stock - cantidad

    const productonuevostock = await updateProduct(id, {stock:stocknuevo})

    console.log(`Actualizando stock del producto ${id} en ${cantidad} unidades`);

    return productonuevostock;
}
  
  async function generarTicketCompra(infoticket) {
   
    const ticketnuevo = await createticket(infoticket)

    return ticketnuevo;
  }



module.exports = currentList;
//TODOS
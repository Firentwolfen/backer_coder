const fs = require("fs");
const Producto = require("./ProductManager");
const producto = new Producto(__dirname+"/routers/products.json");

class cartManager {
  #products;
  #carts;
  #path;
  #stocks;

  constructor(ruta) {
    (this.#carts = []),(this.#products = []), (this.#path = ruta),(this.#stocks = []) ;
  }
  async #conexionarchivo(){
    let archivoexiste = fs.existsSync(this.#path);
  
    if (archivoexiste) {
      const resultado = await fs.promises.readFile(this.#path, "utf-8");
  
      if (resultado) {
      return resultado
      } 
      else {
    return {msg:"El archivo que desea revisar no existe"}
   }
    }
  }
  
    async addCart() {
      
        const resultado = await fs.promises.readFile(this.#path, "utf-8");
  
        await (resultado
          ? (this.#carts = JSON.parse(resultado))
          : (this.#carts = []));
  
          let idsumable = this.#carts.length+1;
        
        const carritoCreado = {
            id: idsumable,
            products:this.#products
          };
  
          this.#carts.push(carritoCreado);
  
          fs.writeFileSync(this.#path, JSON.stringify(this.#carts));
  
          return {
            msg: "El carro ha sido creado", 
            carts:carritoCreado
          } 
      }
      
    async getCartContentById(idQuery) {
  
      const resultado = await this.#conexionarchivo()
  
        if (resultado) { 
          this.#products= JSON.parse(resultado);
  
          const carroSolicitado = this.#products.find(
            (elemento) => elemento.id === idQuery);
    
          if (carroSolicitado === undefined) {
            return {msg:"No found it. El carro solicitado no existe"};
          } else {

            let productosCarrito = carroSolicitado.products

            return {
              msg: `Estos son los productos que estan asociados al carro nro: ${idQuery}`, 
              productosCarrito
            } 
          }}
    }
  
   async updateCart(idCarro,idProducto,cantidad) {
     
    const resultado = await this.#conexionarchivo()
  
      if (resultado) { 
  
        this.#carts = JSON.parse(resultado);
  
        const carroSolicitado = this.#carts.find(
          (elemento) => elemento.id === idCarro);
  
        if (carroSolicitado === undefined) {
          return {msg: `No found it. El carro no existe`};
        } else {
        
          this.#stocks = await producto.getProducts();

          const productoExiste = this.#stocks.find(
            (elemento) => elemento.id === idProducto && elemento.status === true);
    
          if (productoExiste === undefined) {
            return {msg: `No found it. El producto que desea agregar al carro no existe`};
          } else {

          let productosActuales = carroSolicitado.products;
          let carroActualizado={}
          
          const productoRepetido = productosActuales.find((elemento) => elemento.id == idProducto);
          if (productoRepetido == undefined) {
          let productoNuevo = [...productosActuales,{"id":idProducto,"quantity":cantidad}]
          carroActualizado={...carroSolicitado,products:productoNuevo}
          } else {
            const {quantity} = productoRepetido
           let cantidadActualizado = quantity + cantidad
           const list = productosActuales.filter((elemento) => elemento.id !== idProducto);
            let productoSumado =[...list,{"id":idProducto,"quantity":cantidadActualizado}]
            carroActualizado={...carroSolicitado,products:productoSumado}
          }
  
  const listanueva = this.#carts.filter((elemento) => elemento.id !== idCarro);
  
  listanueva.push(carroActualizado);
  
 fs.writeFileSync(this.#path, JSON.stringify(listanueva));
  return {
   msg: "El carro ha sido actualizado", 
  carroActualizado
} 
        }
      }}
      
    }
 
    async getCarts() {
 
      const resultado = await this.#conexionarchivo()
  
        if (resultado.length>0) { 
        this.#carts= JSON.parse(resultado);
        return this.#carts;
          }
          else {
            return {
              msg: "Actualmente no hay carros de compra. Favor de ingresar al menos un carro con productos", 
            } 
          }     
    }



  }

module.exports = cartManager;

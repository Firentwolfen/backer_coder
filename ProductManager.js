const fs = require("fs");

class productManager {
  #products;
  #path;

  constructor(ruta) {
    (this.#products = []), (this.#path = ruta);
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

  async addProduct(productoaagregar) {
    const { code, title, description, price, stock, category, thumbnails} =
      productoaagregar;

    if (!title || !description || !price || !category || !code || !stock) {
      return {msg: `Todos los campos son obligatorios, favor de ingresar la informacion correctamente`};
    } else {
     
      const resultado = await fs.promises.readFile(this.#path, "utf-8");

      await (resultado
        ? (this.#products = JSON.parse(resultado))
        : (this.#products = []));

      const chequeo = this.#products.some((elemento) => elemento.code == code);

      if (chequeo === true) {
        return {msg: `El codigo ${code} que esta ingresando se encuentra usado por otro producto, favor de utilizar otro`};
      } else {
       
        let idsumable = this.#products.length+1;
      
      const productoAgregado = {
          id: idsumable,
          code,
          title,
          description,
          category,
          price,
          stock,
          status:true,
          thumbnails,
        };

        this.#products.push(productoAgregado);

        fs.writeFileSync(this.#path, JSON.stringify(this.#products));

        return {
          msg: "El producto ha sido agregado", 
          product:productoAgregado
        } 
     }
      }
    }

  async getProducts() {
 
    const resultado = await this.#conexionarchivo()

      if (resultado) { 
      this.#products= JSON.parse(resultado);
      const productosvisibles = this.#products.filter((elemento) => elemento.status == true);
      return productosvisibles;
        }
        else {
          let stockvacio = this.#products
          return {
            msg: "Actualmente no cuentas con productos ingresados. Favor de ingresar los productos al sistema", 
            products:stockvacio
          } 
        }
      //(this.#products.length>0 ? console.log('Estos son los productos actualmente', this.#products) : console.error('Actualmente no cuentas con productos ingresados. Favor de ingresar los productos al sistema') ) ;
   
  }

  async getProductsById(idQuery) {

    const resultado = await this.#conexionarchivo()

      if (resultado) { 
        this.#products= JSON.parse(resultado);

        const productoSolicitado = this.#products.find(
          (elemento) => elemento.id === idQuery && elemento.status === true
        );
  
        if (productoSolicitado === undefined) {
          return {msg:"No found it. El producto solicitado no existe"};
        } else {
          return productoSolicitado;
        }}
  }

 async updateProduct(idQuery, valores) {
   
  const resultado = await this.#conexionarchivo()

    if (resultado) { 

      this.#products = JSON.parse(resultado);

      const productoSolicitado = this.#products.find(
        (elemento) => elemento.id === idQuery && elemento.status === true
      );

      if (productoSolicitado === undefined) {
        return {msg: `No found it. El producto a actualizar no existe`};
      } else {
       let { code } = valores
       let productoactualizado={}

   
        const coderepetido= this.#products.find((elemento) =>  elemento.code === code && elemento.status === true);
        if (coderepetido != undefined) {
          return {msg: `El codigo ${code} que esta ingresando se encuentra usado por otro producto, favor de utilizar otro`} 
        } else {
        productoactualizado={...productoSolicitado,...valores}
        }

const listanueva = this.#products.filter((elemento) => elemento.id !== idQuery);

listanueva.push(productoactualizado);

fs.writeFileSync(this.#path, JSON.stringify(listanueva));
return {
  msg: "El producto ha sido actualizado", 
  productoactualizado
} 
      }
    }
    
  }

  async deleteProduct(idQuery) {
   
    const resultado = await this.#conexionarchivo()
  
      if (resultado) { 

      this.#products = JSON.parse(resultado);

      const productoaborrar = this.#products.find(
        (elemento) => elemento.id === idQuery && elemento.status === true
      );

      if (productoaborrar === undefined) {
        return {msg:"No found it. El producto a eliminar no existe"}
      } else {      
        let { status } = productoaborrar
        let productoactualizado={}
         status=false;
         productoactualizado={...productoaborrar,status}
        
 const listanueva = this.#products.filter((elemento) => elemento.id !== idQuery);
 
 listanueva.push(productoactualizado);
 
 fs.writeFileSync(this.#path, JSON.stringify(listanueva));

 return {msg:"El producto ha sido eliminado correctamente"}
 
       }
   
  }

}


}

module.exports = productManager;

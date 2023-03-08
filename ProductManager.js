const fs = require("fs");

class productManager {
  #products;
  #path;

  constructor(ruta) {
    (this.#products = []), (this.#path = ruta);
  }

  async addProduct(productoaagregar) {
    //this.#products = [];
    const { code, title, description, price, stock, thumbnail } =
      productoaagregar;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.warn(
        `Todos los campos son obligatorios, favor de ingresar la informacion correctamente`
      );
    } else {
     
      const resultado = await fs.promises.readFile(this.#path, "utf-8");

      await (resultado
        ? (this.#products = JSON.parse(resultado))
        : (this.#products = []));

      const chequeo = this.#products.some((elemento) => elemento.code == code);

      if (chequeo === true) {
        return console.error(
          `El codigo ${code} que esta ingresando se encuentra usado por otro producto, favor de utilizar otro`
        );
      } else {
       
        let idsumable = this.#products.length+1;
      
      const productoAgregado = {
          id: idsumable,
          code,
          title,
          description,
          price,
          stock,
          thumbnail,
          status:true,
        };

        this.#products.push(productoAgregado);

        fs.writeFileSync(this.#path, JSON.stringify(this.#products));

        console.log("El producto ha sido agregado", productoAgregado);
     }
      }
    }

  async getProducts() {
    let archivoexiste = fs.existsSync(this.#path);

    if (archivoexiste) {
      const resultado = await fs.promises.readFile(this.#path, "utf-8");

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
    } else {
      return {msg:"El archivo que desea revisar no existe"}
    }
  }

  async getProductsById(idQuery) {

    let archivoexiste = fs.existsSync(this.#path);

    if (archivoexiste) {
      const resultado = await fs.promises.readFile(this.#path, "utf-8");

      if (resultado) { 
        this.#products= JSON.parse(resultado);

        const productoSolicitado = this.#products.find(
          (elemento) => elemento.id === idQuery && elemento.status === true
        );
  
        if (productoSolicitado === undefined) {
          return {msg:"No found it. El producto solicitado no existe"};
        } else {
          return productoSolicitado;
        }}} 
        else {
      return {msg:"El archivo que desea revisar no existe"}
     }
  }

  updateProduct(idQuery, dato, valor) {
    fs.readFile(this.#path, "utf-8", (err, data) => {
      if (err) {
        return console.error(
          "El archivo donde estan los productos no existe"
        );
      }

      this.#products = JSON.parse(data);

      const productoSolicitado = this.#products.find(
        (elemento) => elemento.id === idQuery && elemento.status === true
      );

      if (productoSolicitado === undefined) {
        return console.error("No found it. El producto a actualizar no existe");
      } else {
       let {code, title, description, price, stock, thumbnail } = productoSolicitado
       let productoactualizado={}

    switch (dato) {
        case 'code':
        code=valor  
        productoactualizado={...productoSolicitado,code}
         break;
    
         case 'title':
          title=valor
        productoactualizado={...productoSolicitado,title}
         break;

         case 'description':
          description=valor
        productoactualizado={...productoSolicitado,description}
         break;

         case 'price':
          price=valor
        productoactualizado={...productoSolicitado,price}
         break;

         case 'stock':
          stock=valor
        productoactualizado={...productoSolicitado,stock}
         break;

         case 'thumbnail':
          thumbnail=valor
        productoactualizado={...productoSolicitado,thumbnail}
         break;

        default:
            break;
    }
const listanueva = this.#products.filter((elemento) => elemento.id !== idQuery);

listanueva.push(productoactualizado);

fs.writeFileSync(this.#path, JSON.stringify(listanueva));

console.log("El producto ha sido actualizado: ", productoactualizado);

      }
    });
  }

  deleteProduct(idQuery) {
    fs.readFile(this.#path, "utf-8", (err, data) => {
      if (err) {
        return console.error(
          "El archivo donde estan los productos no existe"
        );
      }

      this.#products = JSON.parse(data);

      const productoaborrar = this.#products.find(
        (elemento) => elemento.id === idQuery && elemento.status === true
      );

      if (productoaborrar === undefined) {
        return console.error("No found it. El producto a eliminar no existe");
      } else {      
        let { status } = productoaborrar
        let productoactualizado={}
         status=false;
         productoactualizado={...productoaborrar,status}
        
 const listanueva = this.#products.filter((elemento) => elemento.id !== idQuery);
 
 listanueva.push(productoactualizado);
 
 fs.writeFileSync(this.#path, JSON.stringify(listanueva));

 const productosvisibles = listanueva.filter((elemento) => elemento.status == true);

 console.log("El producto ha sido eliminado correctamente", productosvisibles);  
 
       }
    });
  }
}

module.exports = productManager;

const Producto = require("./ProductManager");

const producto = new Producto("./datos.json");

/*producto.addProduct({

    code: 112,title:'Kapo Naranja',description:'jugo toxico de quimicos',price:500,stock:10 ,thumbnail:'link generico'
}
    );*/
/*
producto.addProduct({
  code: 124,
  title: "Cocacola Light",
  description: "bebida de soda dietetica",
  price: 1500,
  stock: 100,
  thumbnail: "link generico",
});*/

producto.getProducts();

//producto.getProductsById(1);

//producto.updateProduct(2,'price',2000);

//producto.deleteProduct(4);
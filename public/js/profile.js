const socket = io();

const productos = document.getElementById('prodArr');

function addProduct(e) {
  let product = {
  code: document.getElementById("code").value,
  title: document.getElementById("title").value,
  description: document.getElementById("description").value,
  price: document.getElementById("price").value,
  stock: document.getElementById("stock").value,
  category: document.getElementById("category").value,
  thumbnails:['http://dummyimage.com/204x118.png/cc0000/ffffff']
  };
    socket.emit('agregarProducto',product)
    return false;
  }

  function deleteProduct(e) {
    let product = {
     id: document.getElementById("id").value,
    };
  
    socket.emit('eliminarProducto',product)
    return false;
  }

socket.emit('msg','Cliente conectado desde Web');

socket.on('actualizacionLista',element=>{
  let arreglo =[]; 
  if(element.status===1){ 
   console.log('Producto agregado:' + element.newproduct)
   } else { 
    console.log('Id del producto eliminado: ' + element.id)
   }
   //reconstruye todo lo que viene del array de elementos
   arreglo.push(...element.arr);
   let listaHtml = "<ul>"
arreglo.forEach(element=>{ 
  listaHtml+= 
  "<h3> Id:" + element.id + "</h3>" +
  "<p> Code:"+ element.code+"</p>" +
  "<h4> Name:" +element.title+"</h4>" +
  "<p> Description :"+ element.description+"</p>"+
  "<p>Price :"+ element.price+"</p>"+
  "<p> Stock :"+ element.stock+"</p>"+
  "<p> Category :"+ element.category+"</p>"+
  `<img src=${element.thumbnail} alt=''>`;
})

listaHtml += "</ul>"; // agrega el tag final de </ul> al string
productos.innerHTML = listaHtml;
   })


   
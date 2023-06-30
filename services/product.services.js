const EntityDAO = require("../DAO/Entity.dao");

const Products = new EntityDAO('Products');

const getAllProducts = async ()=>{
try {
    return await Products.getAll();
} catch (error) {
    throw error
}
}

const createProduct = async newProductInfo => {

    try {

const newProdc = await Products.create(newProductInfo)

return newProdc

    } catch (error) {
        throw error
    }
} 

const updateProduct = async (code,datoamodificar) => {

    try {

const prodcActualizado = await Products.update(code,datoamodificar)

return prodcActualizado

    } catch (error) {
        throw error
    }
} 

const deleteProduct = async (code) => {

    try {

const prodcBorrado = await Products.delete(code)

return prodcBorrado

    } catch (error) {
        throw error
    }
} 

const findProduct = async (code) => {

    try {

const prodcExistente = await Products.getOne(code)

return prodcExistente

    } catch (error) {
        throw error
    }
} 

const findProductId = async (id) => {

    try {

const prodcExistenteId = await Products.getOneID(id)

return prodcExistenteId

    } catch (error) {
        throw error
    }
} 

module.exports = { 
    getAllProducts,createProduct,updateProduct,deleteProduct,findProduct,findProductId
}
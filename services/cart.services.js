const EntityDAO = require("../DAO/Entity.dao");

const Carts = new EntityDAO('Carts');

const getAllCarts = async ()=>{
try {
    return await Carts.getAll();
} catch (error) {
    throw error
}
}

const createCart = async newCartInfo => {

    try {

const newcart = await Carts.create(newCartInfo)

return newcart

    } catch (error) {
        throw error
    }
} 

const updateCart = async (code,datoamodificar) => {

    try {

const cartActualizado = await Carts.update(code,datoamodificar)

return cartActualizado

    } catch (error) {
        throw error
    }
} 

const deleteCart = async (code) => {

    try {

const cartBorrado = await Carts.delete(code)

return cartBorrado

    } catch (error) {
        throw error
    }
} 

const findCart = async (code) => {

    try {

const cartExistente = await Carts.getOne(code)

return cartExistente

    } catch (error) {
        throw error
    }
} 

const findCartId = async (id) => {

    try {

const cartExistenteId = await Carts.getOneID(id)

return cartExistenteId

    } catch (error) {
        throw error
    }
} 

module.exports = { 
    getAllCarts,createCart,updateCart,deleteCart,findCart,findCartId
}
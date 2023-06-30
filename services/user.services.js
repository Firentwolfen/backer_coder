const EntityDAO = require("../DAO/Entity.dao");
const message = require("../repositories");

const Users = new EntityDAO('Users');

const getAllUsers = async ()=>{
try {
    return await Users.getAll();
} catch (error) {
    throw error
}
}

const createUser = async newUserInfo => {

    try {

const newUser = await Users.create(newUserInfo)

await message.send(newUserInfo);

return newUser

    } catch (error) {
        throw error
    }
} 

const updateUser = async (mailUsuario,datoamodificar) => {

    try {

const usuarioActualizado = await Users.update(mailUsuario,datoamodificar)

return usuarioActualizado

    } catch (error) {
        throw error
    }
} 

const deleteUser = async (mailUsuario) => {

    try {

const usuarioBorrado = await Users.delete(mailUsuario)

return usuarioBorrado

    } catch (error) {
        throw error
    }
} 

const findUser = async (mailUsuario) => {

    try {

const usuarioExistente = await Users.getOne(mailUsuario)

return usuarioExistente

    } catch (error) {
        throw error
    }
} 

const findUserId = async (id) => {

    try {

const usuarioExistenteId = await Users.getOneID(id)

return usuarioExistenteId

    } catch (error) {
        throw error
    }
} 

module.exports = { 
    getAllUsers,
    createUser,
    updateUser,
    findUser,
    findUserId,
    deleteUser,
}
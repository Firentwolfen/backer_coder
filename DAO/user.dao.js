const Usuarios = require("../models/users.model")

class UsersDAO{

    getAll(){}

    getOne(){}

    update(){}

    delete(){}
    

async createNewItem(newUserInfo){
try {
    return await Usuarios.create(newUserInfo)
} catch (error) {
    throw error
}
}

}

module.exports = UsersDAO
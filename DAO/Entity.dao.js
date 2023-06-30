const mapEntity = require("./mapEntity")

class EntityDAO{
constructor(entity){
    this.entity = mapEntity[entity];
 }

    getAll(){
        try {
            return this.entity.getAll();
        } catch (error) {
            throw error  
        }
    }

    getOne(dato){
        try {
            return this.entity.findOne({ dato });
        } catch (error) {
            throw error  
        }
    }

    update(datobusqueda,datomodificar){
        try {
            return this.entity.
            updateOne(
                { datobusqueda },
                { $set: {datomodificar} }
            );
        } catch (error) {
            throw error  
        }
    }

    delete(datobusqueda){
        try {
            return this.entity.
            updateOne(
                { datobusqueda },
                { $set: {status: false } }
            );
        } catch (error) {
            throw error  
        }
    }
    
    getOneID(id){
        try {
            return this.entity.findById(id)
        } catch (error) {
            throw error  
        }

    }


async create(info){
try {
    return await this.entity.create(info)
} catch (error) {
    throw error
}}

} 

module.exports = EntityDAO
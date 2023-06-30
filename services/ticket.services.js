const EntityDAO = require("../DAO/Entity.dao");

const Tickets = new EntityDAO('Tickets');

const getAllTickets = async ()=>{
try {
    return await Tickets.getAll();
} catch (error) {
    throw error
}
}

const createticket = async newTicketInfo => {

    try {

const newticket = await Tickets.create(newTicketInfo)

return newticket

    } catch (error) {
        throw error
    }
} 

const updateticket = async (code,datoamodificar) => {

    try {

const ticketActualizado = await Tickets.update(code,datoamodificar)

return ticketActualizado

    } catch (error) {
        throw error
    }
} 

const deleteticket = async (code) => {

    try {

const ticketBorrado = await Tickets.delete(code)

return ticketBorrado

    } catch (error) {
        throw error
    }
} 

const findticket = async (code) => {

    try {

const ticketExistente = await Tickets.getOne(code)

return ticketExistente

    } catch (error) {
        throw error
    }
} 

const findticketId = async (id) => {

    try {

const ticketExistenteId = await Tickets.getOneID(id)

return ticketExistenteId

    } catch (error) {
        throw error
    }
} 

module.exports = { 
    getAllTickets,createticket,updateticket,deleteticket,findticket,findticketId
}
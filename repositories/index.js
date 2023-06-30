const MessageAdapater = require('./factory')
const MessageRepository = require("./message.repository");

const message = new MessageRepository(new MessageAdapater());

module.exports = message



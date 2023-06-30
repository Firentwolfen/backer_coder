class MessageRepository{
    constructor(messageTool){
this.messageTool = messageTool
    }

    async send(info){

        await this.messageTool.send(info);

    }
}

module.exports = MessageRepository
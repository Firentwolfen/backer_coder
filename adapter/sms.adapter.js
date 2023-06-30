const twilio  = require("twilio");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER } = require("../utils/sms.util");

class SMSAdapter{
async send(info){
    const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)

    await client.messages.create({
        body:`Bienvenido a la plataforma ${info.name}`,
        from: TWILIO_SMS_NUMBER,
        to: newUserInfo.phone
    })
}

}

module.exports = SMSAdapter


const transporter = require("../utils/mail.util")

class MailAdapter{
async send(info){
    await transporter.sendMail({
        from: 'aespinozaservicios@gmail.com', // sender address
        to: info.email, // list of receivers
        subject: `Bienvenido a la plataforma ${info.name}`, // Subject line
        html: `
        <div>
        <h1>Gracias por registrarte!</h1>
        </div>
        `
    })

}

}

module.exports = MailAdapter


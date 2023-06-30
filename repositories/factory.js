const { environment } = require("../config/app.config");

switch (environment) {
    case 'beta':
        console.log('envio con mail');
        module.exports = require('../adapter/mail.adapter')
        break;       
    case 'production':
        console.log('envio con sms');
        module.exports = require('../adapter/sms.adapter')
        break;
}


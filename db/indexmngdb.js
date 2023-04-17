const mongoose= require('mongoose');

const dbConnect = async()=>{
try { 
    await mongoose.connect('mongodb+srv://aespinozaservicios:Vf1mE8DMrp8ualxD@cluster0.wzh9fgf.mongodb.net/?retryWrites=true&w=majority')
    console.log('DB connected!')
} catch (error) {
    console.log("Cannotconnect to Database: "+ error);
    process.exit();
}
}

module.exports = dbConnect;


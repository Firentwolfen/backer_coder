const { Router } = require('express');
const router = Router();
const Usuarios = require('../models/users.model');

router.post('/', async(req,res)=>{


try {
    const {email,password}= req.body;

    const user = await Usuarios.findOne({ email });

//console.log(user);

if (!user) return res.status(400).json({status: 'Error', error:'El usuario y la contraseña no coinciden'})

if (user.password !==password) return res.status(400).json({status: 'Error', error:'El usuario y la contraseña no coinciden'});

req.session.user= {
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
    }

console.log(req.session.user)

res.json({status:'success',message: 'Sesion Iniciada'})
} catch (error) {
    console.log(error);
    res.status(500).json({status:'error', error:'Internal Server Error'})
}
});

router.get('/logout',(req,res)=>{
req.session.destroy(error=>{
    if(error) return res.json({error})
    res.redirect('/login')
})
})

module.exports = router;
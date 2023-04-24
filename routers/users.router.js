const { Router } = require('express');
const Usuarios = require('../models/users.model');
const router = Router();


router.post('/', async(req,res)=>{

   try {
   
    const {first_name, last_name, email,age,password} = req.body

    const newUserInfo =  { 
        first_name,
        last_name,
        email,
        age,
        password
    }
    const users = await Usuarios.create(newUserInfo);

    res.status(201).json({status:'Success', message: users })

   } catch (error) {
    console.log(error.message);
    res.status(500).json({status:'Error', error:'Error interno'})
   }

});

router.post('/login', async(req,res)=>{

    const user = Users.find(req.body.email)

    if (user.password=== req.body.password) {
        
        req.session.role=user.role

    }



    
});

module.exports = router;
const { Router } = require('express');
const passport = require('passport');
const Usuarios = require('../models/users.model');
const { createHash } = require('../utils/cryptPassword');

const router = Router();

router.post('/',
passport.authenticate('register', { failureRedirect: '/users/failregister' }),
async(req,res)=>{

   try {
   
   res.status(201).json({status:'Success', message: 'Usuario registrado' })

   } catch (error) {
    console.log(error.message);
    if (error.code === 11000) {
        return res.status(400).json({ status: 'error', error: 'User existed' })
      }
      res.status(500).json({ status: 'error', error: 'Internal server error' })
    }
});


router.get('/failregister', (req, res) => {
    console.log('falló estrategia de registro')
  
    res.json({ error: 'Failed register' })
  })


/* 
router.post('/login', async(req,res)=>{

    const user = Usuarios.find(req.body.email)

    if (user.password=== req.body.password) {
        
        req.session.role=user.role

    }  
});*/

module.exports = router;
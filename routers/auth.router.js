const { Router } = require('express');
const Usuarios = require('../models/users.model');
const { isValidPassword, hashPassword } = require('../utils/cryptPassword')
const passport = require('passport')

const router = Router();

router.post('/',  

passport.authenticate('login', { failureRedirect: '/auth/faillogin' }),
async(req,res)=>{
try {
   
if (!req.user) return res.status(401).json({status: 'Error', error:'El usuario y la contraseña no coinciden'})

//if (user.password !==password) return res.status(400).json({status: 'Error', error:'El usuario y la contraseña no coinciden'});

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
    }


console.log(req.session.user)

res.json({status:'success',message: 'Sesion Iniciada'})
} catch (error) {
    console.log(error.message);
    res.status(500).json({status:'error', error:'Internal Server Error'})
}
});

router.get('/faillogin', (req, res) => {
  console.log('falló estrategia de ingreso')

  res.json({ error: 'Failed login' })
})



router.get(
  '/github',
  passport.authenticate('github', { scope: ['user: email'] }),
  async (req, res) => {}
)

router.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  }
)

router.get('/logout',(req,res)=>{
req.session.destroy(error=>{
    if(error) return res.json({error})
    res.redirect('/login')
})
})

router.patch('/forgotPassword', async (req, res) => {
    try {
      const { email, password } = req.body
      const passwordEncrypted = hashPassword(password)
      await Usuarios.updateOne({ email }, { password: passwordEncrypted })
  
      res.json({ message: 'Password updated' })
    } catch (error) {
      res.json({ error: error.message })
    }
  })

module.exports = router;
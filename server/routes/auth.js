const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const bcryptSalt = 10

const { isADMIN } = require("../utils")

/* SIGNUP */
router.post('/signup', (req, res) => {
  const { username, pwd, email } = req.body
 console.log(">>>>>>>>" ,username , pwd, email)
  User
    .findOne({ username })
    .then(user => {
      if (user) {
        res.status(400).json({ code: 400, message: "Usuario ya creado,prueba otro" })
        return
      }
      
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(pwd, salt)



      User
        .create({ username, password: hashPass, email })
        .then((user) => res.status(200).json(user))
        .catch(err => res.status(500).json({ code: 500, message: "Error de DB al crear usuario", err: err.message }))
    })
    .catch(err => res.status(500).json({ code: 500, message: "Error de DB buscar usuario", err: err.message }))

})
/* LOGIN */
router.post('/login', (req, res) => {

  const { username, password } = req.body

  User
    .findOne({ username })
    .then(user => {

      if (!user) {
        res.status(401).json({ code: 401, message: 'No existe ese usuario' })
        return
      }

      if (bcrypt.compareSync(password, user.password) === false) {
        res.status(401).json({ code: 401, message: 'Contraseña incorrecta ' })
        return
      }

      req.session.currentUser = user
      console.log(req.session.currentUser)
      res.json(req.session.currentUser)
    })
    .catch(err => res.status(500).json({ code: 500, message: 'Error de la DB buscando usuario', err }))
})

/* LOGOUT */
router.get('/logout', (req, res) => {
  console.log(req.session.currentUser)
  req.session.destroy((err) => res.status(200).json({ code: 200, message: 'Sesion cerrada correctamente' }));
})
/* Comprobación de login */
router.get("/isloggedin", (req, res) => {
  req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Accede o registrate' })
})

module.exports = router



const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const bcryptSalt = 10

const { isADMIN } = require("../utils")

router.post('/signup', (req, res) => {
  const { username, pwd, email } = req.body

  User
    .findOne({ username })
    .then(user => {
      if (user) {
        res.status(400).json({ code: 400, message: "Este usuario ya está registrado, prueba otro" })
        return
      }

      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(pwd, salt)

      User
        .create({ username, password: hashPass, email })
        .then((user) => {
          req.session.currentUser = user
          res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ code: 500, message: "Error de BBDD al crear usuario", err: err.message }))

    })
    .catch(err => res.status(500).json({ code: 500, message: "Error de BBDD al buscar usuario", err: err.message }))

})

router.post('/login', (req, res) => {

  const { username, password } = req.body

  User
    .findOne({ username })
    .then(user => {

      if (!user) {
        res.status(401).json({ code: 401, message: 'No existe este usuario' })
        return
      }

      if (bcrypt.compareSync(password, user.password) === false) {
        res.status(401).json({ code: 401, message: 'Contraseña incorrecta' })
        return
      }

      req.session.currentUser = user
      console.log(req.session.currentUser)
      res.json(req.session.currentUser)
    })
    .catch(err => res.status(500).json({ code: 500, message: 'Error de la BBDD buscando usuario', err }))
})

router.get('/logout', (req, res) => {
  console.log(req.session.currentUser)
  req.session.destroy((err) => res.status(200).json({ code: 200, message: 'Sesion cerrada correctamente' }));
})

router.get("/isloggedin", (req, res) => {
  req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Accede o registrate' })
})

module.exports = router



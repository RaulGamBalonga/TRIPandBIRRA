const router = require("express").Router()
const User = require("../models/User.model")


router.get("/all", (req, res) => {
    Coaster.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json({ err, errMessage: "Problema buscando usuarios" }))
})


router.put("/edit/:id", (req, res) => {
    const { id } = req.params
    const { username, email, image, favorites } = req.body

    User.findByIdAndUpdate(id, { username, email, image, favorites }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ err, errMessage: "Problema editando usuario" }))
})


router.delete("/delete/:id", (req, res) => {
    const { id } = req.params

    User.findByIdAndDelete(id)
        .then(deleteUser => res.json({ deleteUser }))
        .catch(err => res.json({ err, errMessage: "Problema borrando usuario" }))
})


router.get("/:id", (req, res) => {
    const { id } = req.params

    User.findById(id)
        .then(theUser => res.json(theUser))
        .catch(err => res.json({ err, errMessage: "Problema buscando un usuario" }))
})


module.exports = router
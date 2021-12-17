const router = require("express").Router()
const User = require("../models/User.model")
const Bar = require("../models/Bar.model")
const { isLoggedIn } = require("../middleware");

router.get("/all", isLoggedIn, (req, res) => {
    User.find()
        .populate('favorites')
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json({ err, errMessage: "Problema buscando usuarios" }))
})

router.put("/edit/:id", isLoggedIn, (req, res) => {
    const { id } = req.params
    const { username, email, image, favorites } = req.body.

        User.findByIdAndUpdate(id, { username, email, image, favorites }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ err, errMessage: "Problema editando usuario" }))
})

router.delete("/delete/:id", isLoggedIn, (req, res) => {
    const { id } = req.params

    User.findByIdAndDelete(id)
        .then(deleteUser => res.json({ deleteUser }))
        .catch(err => res.json({ err, errMessage: "Problema borrando usuario" }))
})

router.put('/add-favorites', isLoggedIn, (req, res) => {

    const userId = req.session.currentUser._id 
    const { barId } = req.body



    User.findByIdAndUpdate(userId, { $push: { favorites: barId } }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ err, errMessage: "Problema actualizando favoritos" }))
})

router.get("/one", isLoggedIn, (req, res) => {

    const id = req.session.currentUser._id

    User.findById(id)
        .populate('favorites')
        .then(theUser => {
            
            res.json(theUser)
        })
        .catch(err => res.json({ err, errMessage: "Problema buscando un usuario" }))
})

module.exports = router
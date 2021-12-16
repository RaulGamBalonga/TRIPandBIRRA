const router = require("express").Router()
const Bar = require("../models/Bar.model")
const { isLoggedIn } = require("../middleware");

router.get("/all", isLoggedIn, (req, res) => {

    Bar.find()
        .then(allBar => res.json(allBar))
        .catch(err => res.json({ err, errMessage: "Problema buscando bares" }))
})

router.post("/new", isLoggedIn, (req, res) => {
    const { name, latitude, longitude, image } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Bar.create({ name, location, image })
        .then(newBar => res.json(newBar))
        .catch(err => res.json({ err, errMessage: "Hay un problema construyendo el bar" }))
})

router.put("/editBar/:id", isLoggedIn, (req, res) => {
    const { id } = req.params
    const { name, location, image } = req.body

    Coaster.findByIdAndUpdate(id, { name, location, image }, { new: true })
        .then(updatedBar => res.json(updatedBar))
        .catch(err => res.json({ err, errMessage: "Hay un problema reformando el bar" }))
})

router.delete("/deleteBar/:id", isLoggedIn, (req, res) => {
    const { id } = req.params

    Bar.findByIdAndDelete(id)
        .then(deleteBar => res.json({ deleteBar }))
        .catch(err => res.json({ err, errMessage: "Hay un problema eliminando el bar" }))
})

router.get("/markers", (req, res) => {
    Bar.find()
        .then(allBar => {

            const modifiedBars = allBar.map(bar => {
                return {
                    _id: bar._id,
                    text: bar.name,
                    lat: bar.location.coordinates[0],
                    lng: bar.location.coordinates[1]
                }
            })

            return res.json(modifiedBars)
        })
        .catch(err => res.json({ err, errMessage: "Problema buscando bares modificados" }))
})

router.get("/:id", isLoggedIn, (req, res) => {
    const { id } = req.params

    Bar.findById(id)
        .then(theBar => res.json(theBar))
        .catch(err => res.json({ err, errMessage: "Hay un problema buscando el bar" }))
})

module.exports = router
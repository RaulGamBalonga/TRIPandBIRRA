const router = require("express").Router()
const Review = require("../models/Review.model")

/* Listado de reseñas */
router.get("/allReviews", (req, res) => {
    Review.find()
        .then(allReviews => res.json(allReviews))
        .catch(err => res.json({ err, errMessage: "Problema buscando reseñas" }))
})


/* Crear una reseña */
router.post("/newReview", (req, res) => {
    const { comment, image, drink, tapa, price, quality, rating, creator, bar } = req.body
    
    Review.create({ comment, image, drink, tapa, price, quality, rating, creator, bar  })
    .then(newReview => res.json(newReview))
    .catch(err => res.json({ err, errMessage: "Problema creando reseña" }))
})
/* Buscar una reseña por ID */
router.get("/:id", (req, res) => {
    const { id } = req.params

    Review.findById(id)
        .then(theReview => res.json(theReview))
        .catch(err => res.json({ err, errMessage: "Problema buscando un reseña" }))
})

module.exports = router;


// todo ->falta popular creator y bar?

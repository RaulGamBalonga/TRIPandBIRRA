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

    const userId = req.session.currentUser._id /* '61b1e0bb8a03c862672a20d8' */
    const { barId } = req.body



    User.findByIdAndUpdate(userId, { $push: { favorites: barId } }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ err, errMessage: "Problema actualizando favoritos" }))
})
/*
PARA AÑADIR UN BAR A LA LISTA DE FAVORITOS DE UN USUARIO
>>>1. creamos la ruta que añada al current user un bar concreto a favoritos
    - necesitamos el id del current user
    - necesitamos el id del bar a añadir
    - actualizamos el USER y añadimos el id del BAR en el array
>>>1.1. en este caso queremos hacer push de un bar a ese array de favoritos, para eso tenemos que mirar como hacerlo (push en mongoose)
X>2. probamos la ruta en postman para comprobar que funciona
>3. creamos el método en el servicio en el cliente
4. en la pagina donde esta el boton de favoritos hacemos que cuando se pulse el boton se llame a la funcion que usa ese servicio para que lo añada a favoritos
5. lo suyo seria que cuando esta añadido a favoritos no puedas añadirlo infinitamente, o que puedas hacer que lo quite de favoritos, una de dos. Es decir: si ya esta en favoritos: lo quitas o simplemente no pones la opcion


TENEMOS QUE ACTUALIZAR EL USUARIO EN EL CLIENTE, YA QUE SOLO LO HEMOS HECHO EN EL BACK
1. tenemos la funcion storeuser en app, que sirve para eso
2. tenemos que pasar esa funcion a la pagina donde actualizamos el user
3. y cuando actualizamos el user, llamamos a esa funcion con el user actualizado para actualizarlo en el cliente


PARA MOSTRAR LOS FAVORITOS DE UN USUARIO
1. queremos mostrar los bares favoritos en el perfil del usuario
2. necesitamos traer los datos del usuario a esa pagina (YA LO TENEMOS HECHO)
3. en esa pagina tenemos ya el logged user, al descomponer las props tenemos que meter tambien los favoritos
3.1. si no nos saliesen los datos del bar es porque hay que popular, que no se si lo teneis ya hecho
4. para mostrar los bares favoritos iteramos sobre ese array
*/

router.get("/one", isLoggedIn, (req, res) => {

    const id = req.session.currentUser._id

    User.findById(id)
        .populate('favorites')
        .then(theUser => {
            console.log('USEEEEER', theUser)
            res.json(theUser)
        })
        .catch(err => res.json({ err, errMessage: "Problema buscando un usuario" }))
})

module.exports = router
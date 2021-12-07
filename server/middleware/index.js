module.exports = {
    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.redirect("/auth/iniciar-sesion")
    }
}

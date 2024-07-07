import { Router } from "express";
import { isAuthenticated, isAdmin, isLogged } from "../utils/middleware/auth.js";
import { UserManagerMongo } from "../dao/db/ManagerMongo/users.model.js";

const viewRoutes = Router()

const userManager = new UserManagerMongo

viewRoutes.get('/home', (req, res) => {
    res.render('home')
})

viewRoutes.get('/login', isLogged, (req, res) => {
    res.render('login')
})

viewRoutes.get('/register', (req, res) => {
    res.render('register')
})

viewRoutes.get('/profile', isAuthenticated, async(req, res) => {
    let resp = await userManager.getProductsByUser(req.session.user.cart[0].products)
    let prods = []
    //Volviendo a hacer un array a parte es la unica manera que me dejaba usar el each de Handlebars
    for (let index = 0; index < resp.length; index++) {
        let prueba = {}
        prueba.name = resp[index].name
        prueba.price = resp[index].price
        prueba.category = resp[index].category
        prods.push(prueba)
    }
    res.render('profile', {prods: prods})
})

viewRoutes.get('/logout', (req, res) => {
    res.render('logout')
})

viewRoutes.get('/*', (req, res) => {
    res.render('404')
})

export default viewRoutes
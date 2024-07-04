import { Router } from "express";
import { isAuthenticated, isAdmin, isLogged } from "../utils/middleware/auth.js";

const viewRoutes = Router()

viewRoutes.get('/home', (req, res) => {
    res.render('home')
})

viewRoutes.get('/login', isLogged, (req, res) => {
    res.render('login')
})

viewRoutes.get('/register', (req, res) => {
    res.render('register')
})

viewRoutes.get('/profile', (req, res) => {
    res.render('profile')
})

viewRoutes.get('/logout', (req, res) => {
    res.render('logout')
})

export default viewRoutes
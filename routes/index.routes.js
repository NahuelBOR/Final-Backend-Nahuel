import { Router } from "express";

const routerHome = Router()


routerHome.get('/chat', (req, res) => {
    res.render('chat', {})
})

routerHome.get('/home', (req, res) => {
    res.render('home', {})
})
















export default routerHome
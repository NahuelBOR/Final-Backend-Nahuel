import { Router } from "express";


const cookRoutes = Router()

cookRoutes.get('/setCookie', (req, res)=>{
    res.cookie('CoderCookie', {user: 'elnau94@gmail.com'}, {signed:true}).send('Cookie creada')
})

cookRoutes.get('/getCookie', (req, res)=>{
    res.send(req.signedCookies)   
})

cookRoutes.get('/deleteCookie', (req, res)=>{
    res.clearCookie('CoderCookie').send('Cookie eliminada')
})

cookRoutes.post('/createCookie', (req, res)  => {
    res.cookie('CoderCookie', {user: req.body.correo}, {maxAge: 10000}).send('Cookie creada')
})

cookRoutes.get('/formulario', (req, res)=> {
    res.render('cookies', {})
})

export default cookRoutes
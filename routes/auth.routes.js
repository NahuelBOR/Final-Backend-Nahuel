import { Router } from "express";
import { generaToken } from "../path.js";
import { auth } from "../utils/middleware/auth.js";


//NO USADO
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const authRoutes = Router()

let users = []

authRoutes.post('/regist', (req, res) => {
    let userNew = req.body
    userNew.id = Math.random()*10000000000000000
    users.push(userNew)
    console.log(users);

    res.redirect('/api/view/login')
})

authRoutes.post('/login', (req, res) => {
    let userNew = req.body
    console.log(userNew);
    let userFound = users.find(user => {
        return user.username == userNew.user && user.password == userNew.password
    })

    let token = generaToken(userFound)

    if(userFound){
        req.session.user = userNew.user
        req.session.password = userNew.password
        req.session.rol = 'usuario' // o admin

        res.cookie('cookieToken', token, {httpOnly: true}).status(200).json({user: userFound, token: token})
        //res.redirect('/api/view/profile')
        return
    }

    res.send('Usuario o contraseña no encontrados')
})

authRoutes.get('/perfil', auth, (req, res) => {

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({mensaje: 'Perfil Usuario', user: req.user})
})

authRoutes.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.send('Error logout')
    })

    res.redirect('/api/view/login')
})

authRoutes.get('/user', (req, res) => {
    res.send(users)
})

export default authRoutes
import { Router } from "express";
import { createHash, isValidPass } from "../utils/bcryps.js";
import passport from "passport";
import { initializePassport, authorization } from "../passport/passport.js";
import { User } from "../dao/db/models/users.model.js";
import { isAuthenticated, isAdmin } from "../utils/middleware/auth.js";

const userRoutes = Router()

userRoutes.post('/register', passport.authenticate('register', {failureRedirect: 'user/failedRegister'}), (req, res) => {
    res.send('User register')
})

userRoutes.get('/failedRegister', (req, res) => {
    res.send('Failed user register')
})

userRoutes.post('/login', async (req, res) => {
    let userNew = req.body
    try {
        let userFound = await User.findOne({email: userNew.email})
        console.log(userFound) 
        if(userFound){
            if (isValidPass(userFound, userNew.password)) {
                req.session.userId = userFound.email
                req.session.admin = userFound.role == 'admin' ? true : false
                req.session.user = userFound
                return res.redirect('/api/view/profile')
            }
            return res.send('Password incorrecto')
        }
        res.send('Usuario incorrecto')
    } catch (err) {
        return res.status(500).json({ message: 'Error en el servidor', error: err.message });
    }
    
})

userRoutes.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.send('Error logout')
    })

    res.redirect('/api/view/home')
})

userRoutes.get('/users', isAuthenticated, isAdmin, async (req, res) => { // DEBE SER ADMIN PARA VER TODOS LOS USUARIOS
    let users = await User.find()
    res.send(users)
})

export default userRoutes
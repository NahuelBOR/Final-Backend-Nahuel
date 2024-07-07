import { Router } from "express";
import { createHash, isValidPass } from "../utils/bcryps.js";
import passport from "passport";
import { initializePassport, authorization } from "../passport/passport.js";
import { User } from "../dao/db/models/users.model.js";
import { isAuthenticated, isAdmin } from "../utils/middleware/auth.js";
import { sendDeletionEmail } from "../utils/mail.js";

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

userRoutes.get('/delete', async (req, res) => {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      // Encontrar usuarios que serán eliminados
      const usuariosAEliminar = await User.find({ last_connection: { $lt: twoDaysAgo } });
  
      // Eliminar usuarios
      const result = await User.deleteMany({ last_connection: { $lt: twoDaysAgo } });
  
      // Enviar correos electrónicos
      for (const usuario of usuariosAEliminar) {
        await sendDeletionEmail(usuario);
      }
  
      res.json({ message: `${result.deletedCount} usuarios eliminados y notificados` });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar usuarios', error });
    }
  });

export default userRoutes
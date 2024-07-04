import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from "../dao/db/models/users.model.js"
import { createHash, isValidPass } from "../utils/bcryps.js";
import github from "passport-github2"
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Cart } from "../dao/db/models/carts.model.js";
import obtenerFechaActual from "../utils/fecha.js";

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['cookieToken'];
    }
    return token;
};

export const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {usernameField: 'email', passReqToCallback:true},
        async (req, username, password, done) => {
            try{
                let userData = req.body
                let user = await User.findOne({email: username})
                if (user) {
                    done('Error, user ya existe')
                }
                //let cart = await Cart.create({date: obtenerFechaActual()})
                let userNew ={
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: username,
                    age: userData.age,
                    password: createHash(userData.password),
                    cart: await Cart.create({date: obtenerFechaActual()}),
                    //cart: cart._id,
                    role: userData.role
                }
                let result = await User.create(userNew)
                done(null, result)
            }catch(err){
                done('Error, al crear usuario ' + err)
            }
        }
    ))
    

    passport.use('github', new github.Strategy(
        {
            clientID: 'Iv23lir9P4OkmRBUdhNp',
            clientSecret: 'c13659a0672edadbf07cb68c33fef094eb3aff66',
            callbackURL: 'http://localhost:8080/api/sessions/callbackGithub'
        },
        async(accessToken, refreshToken, profile ,done) => {
            try {
                let {name, email} = profile._json
                let usuario = await User.findOne({email: email})

                if (!usuario) {
                    usuario = await User.create(
                        {
                            name: name,
                            email: email,
                            github: profile
                        }
                    )
                }
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'CoderCoder123'
    }, async (jwt_peyload, done) => {
        try {
            return done(null, jwt_peyload)
        } catch (error) {
            return done('Error en JWT passport', error)
        }
    }))

    passport.serializeUser( (user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser( (id, done) => {
        let user = User.findById(id)
        done(null, user)
    })
}

export const authorization = () => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).send({error: 'No autorizado'})
        if (req.user.role != 'admin') return res.status(403).send({error: 'Sin permisos'})

        next()
    }
}
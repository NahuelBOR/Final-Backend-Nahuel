import express from 'express'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
import routerHome from './routes/index.routes.js'
import prodRoutes from './routes/products.routes.js'
import cartRoutes from './routes/cart.routes.js'
import { Server } from "socket.io"
import { createServer } from 'node:http';
import dataBase from './dao/db/index.js'
import { ChatManagerMongo } from './dao/db/ManagerMongo/chatManager.js'
import { ProductManagerMongo } from './dao/db/ManagerMongo/productManager.js'
import cookieParser from 'cookie-parser'
import cookRoutes from './routes/cookies.routes.js'
import session from 'express-session'
import sessionFileStore from 'session-file-store';
import MongoStore from 'connect-mongo'
import viewRoutes from './routes/views.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/users.routes.js'
import passport from 'passport'
import { initializePassport } from './passport/passport.js'
import githubRouter from './routes/githubSession.routes.js'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
const FileStore = sessionFileStore(session);

const chatManager = new ChatManagerMongo()

dotenv.config()

//Iniciar session-express


const app = express()
const server = createServer(app);
const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI
const SESSION_SECRET = process.env.SESSION_SECRET
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get(cors())

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGODB_URI
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

let msjs = []

//PUBLIC
app.use(express.static(__dirname + '/public'))


//ENGINE
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//ROUTES
//app.use('/api', authRoutes)
app.use('/api', routerHome)
app.use('/api/prod', prodRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/view', viewRoutes)
app.use('/api/user', userRoutes)
app.use('/api/cookies', cookRoutes)
app.use('/api/sessions', githubRouter)
app.use(cookieParser('codersecret'))

const io = new Server(server)

initializePassport()
app.use(passport.initialize())
app.use(passport.session())
  
// MAIL

/*const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASS_NODEMAILER
    },
});

app.use('/mail', async (req, res) => {
    let mensaje = await transporter.sendMail({
        from: 'Codet Test <elnau94@gmail.com>',
        to: 'camillee.krk@gmail.com',
        subject: 'Prueba test',
        text: 'Texto',
        html: `
        <div>
        <h2>Lorem ipsum</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        `
    })
    if (!!mensaje.messageId) {
        console.log('Mensaje enviado', mensaje.messageId);
        res.send('Mensaje enviado')
    }
})*/



io.on('connection', (socket) => {
    console.log('User Connected');

    socket.on('msjNuevo', async (data) => {
        await chatManager.addMsj(data)
        io.sockets.emit('msjChat', await chatManager.allMsj())
        //msjs.push(data)
        //io.sockets.emit('msjChat', msjs)
    })

    /*let allProds = async () => {
        socket.emit('prods', await productManager.allProduct())
    }
    allProds()*/
})



















server.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
    dataBase.connect()
})


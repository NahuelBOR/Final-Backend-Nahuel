const express = require('express');
const nodemailer = require('nodemailer')

const mailRouter = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "elnau94@gmail.com",
        pass: "jzaxngygbxdmqkrq",
    },
    tls: {
        rejectUnauthorized: false
    }
})

mailRouter.post('/', async (req, res) => {
    try {
        const message = await transporter.sendMail({
            from: 'Coder Test <elnau94@gmail>',
            to: 'fondestaura@hotmail.com',
            subject: 'Mail prueba',
            text: 'texto',
            html: `<div>
            <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h1>
            </div>`,
            attachments: []
        });
        console.log('email se envio:', message.response);
        res.send('Correo se envio correctamente.');
    } catch (error) {
        console.error('Error al enviar correo:', error);
        res.status(500).send('Error al enviar el correo.');
    }
});

module.exports = mailRouter
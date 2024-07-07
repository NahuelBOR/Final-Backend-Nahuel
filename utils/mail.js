import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASS_NODEMAILER
    },
});

export const sendDeletionEmail = async (user) => {
    const mailOptions = {
      from: '"Tu Aplicación" <tu_email@dominio.com>',
      to: user.email,
      subject: 'Cuenta Eliminada',
      text: `Hola ${user.first_name}, tu cuenta ha sido eliminada debido a inactividad prolongada.`
    };
  
    await transporter.sendMail(mailOptions);
  };

/*app.use('/mail', async (req, res) => {
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
})
*/
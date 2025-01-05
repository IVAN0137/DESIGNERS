const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Ruta para manejar el envío de correos
app.post('/api/enviar-email', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: `Nuevo mensaje de ${nombre}`,
    text: `
      Nombre: ${nombre}
      Email: ${email}
      Mensaje: ${mensaje}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Error al enviar el correo' });
    } else {
      console.log('Email enviado: ' + info.response);
      res.json({ success: true });
    }
  });
});

// Servir el archivo index.html para todas las rutas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
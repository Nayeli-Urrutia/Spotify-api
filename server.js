const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public'))); // Asegúrate de tener los archivos en una carpeta 'public'

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Asegúrate de que tu HTML esté en la carpeta 'public'
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

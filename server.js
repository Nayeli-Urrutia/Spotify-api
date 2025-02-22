const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el callback de Spotify
app.get('/callback', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejar rutas no encontradas
app.get('*', (req, res) => {
    res.status(404).send('Ruta no encontrada');
});

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
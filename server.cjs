const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Si usas Create React App, cambia 'dist' por 'build'
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
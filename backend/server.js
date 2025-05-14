const express = require('express');
const cors = require('cors');
const app = express();
const librosRoutes = require('./routes/libros');
const usuariosRoutes = require('./routes/usuarios');

app.use(cors());
app.use(express.json());

app.use('/api/libros', librosRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.listen(3000, () => {
    console.log('Servidor backend corriendo en http://localhost:3000');
});

const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// LOGIN
app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE usuario = $1 AND password = $2',
            [usuario, password]
        );
        if (result.rows.length > 0) {
            res.json({ success: true, message: "Acceso permitido", user: result.rows[0] });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// OBTENER Perfil (GET)
app.get('/perfil/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM perfiles WHERE usuario_id = $1', [req.params.id]);
        res.json(result.rows[0] || {});
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// CREAR o ACTUALIZAR Perfil
app.post('/perfil', async (req, res) => {
    const { nombre, apellido, edad, correo, telefono, usuario_id } = req.body;
    try {
        const check = await pool.query('SELECT * FROM perfiles WHERE correo = $1', [correo]);
        const query = `
            INSERT INTO perfiles (nombre, apellido, edad, correo, telefono, usuario_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (correo) DO UPDATE 
            SET nombre = $1, apellido = $2, edad = $3, telefono = $5
            RETURNING *;
        `;
        const result = await pool.query(query, [nombre, apellido, edad, correo, telefono, usuario_id]);

        if (check.rows.length > 0) {
            res.json({ success: true, message: "¡Perfil actualizado correctamente!", data: result.rows[0] });
        } else {
            res.json({ success: true, message: "¡Perfil guardado por primera vez!", data: result.rows[0] });
        }
    } catch (err) { res.status(500).json({ error: err.message }); }
});


app.put('/perfil', async (req, res) => {
    const { nombre, apellido, edad, correo, telefono } = req.body;
    try {
        const result = await pool.query(
            'UPDATE perfiles SET nombre=$1, apellido=$2, edad=$3, telefono=$4 WHERE correo=$5 RETURNING *',
            [nombre, apellido, edad, telefono, correo]
        );
        res.json({ success: true, message: "¡Perfil actualizado correctamente!", data: result.rows[0] });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
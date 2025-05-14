const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Get
router.get('/', (req, res) => {
    db.all("SELECT id, nombre, email FROM usuarios", [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Post
router.post('/',
    body('nombre').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 4 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { nombre, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
            [nombre, email, hashedPassword],
            function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(201).json({ id: this.lastID });
            });
    }
);

// update
router.put('/:id',
    body('nombre').notEmpty(),
    body('email').isEmail(),
    async (req, res) => {
        const { nombre, email } = req.body;

        db.run("UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?",
            [nombre, email, req.params.id],
            function (err) {
                if (err) return res.status(500).send(err.message);
                res.json({ actualizado: this.changes });
            });
    }
);

// DELETE
router.delete('/:id', (req, res) => {
    db.run("DELETE FROM usuarios WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.json({ eliminado: this.changes });
    });
});

module.exports = router;
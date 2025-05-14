const express = require('express');
const router = express.Router();
const db = require('../db');


// Obtener todos
router.get('/', (req, res) => {
    db.all("SELECT * FROM libros", [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Crear 
router.post('/', (req, res) => {
    const { titulo, autor, year, isbn } = req.body;
    db.run("INSERT INTO libros (titulo, autor, year, isbn) VALUES (?, ?, ?, ?)",
        [titulo, autor, year, isbn],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).json({ id: this.lastID });
        });
});

// actualizar 
router.put('/:id', (req, res) => {
    const { titulo, autor, year, isbn } = req.body;
    db.run("UPDATE libros SET titulo = ?, autor = ?, year = ?, isbn = ? WHERE id = ?",
        [titulo, autor, year, isbn, req.params.id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.json({ actualizado: this.changes });
        });
});

// eliminar 
router.delete('/:id', (req, res) => {
    db.run("DELETE FROM libros WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.json({ eliminado: this.changes });
    });
});

module.exports = router;
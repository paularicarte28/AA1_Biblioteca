const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./biblioteca.db');

// Crear tablas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS libros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        autor TEXT,
        year INTEGER,
        isbn TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT UNIQUE,
        password TEXT
    )`);
});

module.exports = db;
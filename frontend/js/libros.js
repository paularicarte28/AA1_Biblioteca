const API = 'http://localhost:3000/api/libros';

function cargarLibros() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('listaLibros');
            lista.innerHTML = '';
            data.forEach(libro => {
                const li = document.createElement('li');
                li.textContent = `${libro.titulo} - ${libro.autor} (${libro.year})`;
                lista.appendChild(li);
            });
        });
}

function crearLibro() {
    const data = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        year: parseInt(document.getElementById('year').value),
        isbn: document.getElementById('isbn').value,
    };

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(() => cargarLibros());
}

cargarLibros();
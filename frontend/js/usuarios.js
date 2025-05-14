function crearUsuario() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validación básica en frontend
    if (!nombre || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => alert('Error: ' + err.errores.map(e => e.msg).join(', ')));
        }
        return res.json();
    })
    .then(() => {
        cargarUsuarios();
        document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    });
}

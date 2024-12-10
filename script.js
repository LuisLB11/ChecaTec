// Datos iniciales simulados (Usuario registrado)
const perfilGuardado = {
    usuario: "admin",
    password: "1234"
};

// Función para iniciar sesión
function iniciarSesion() {
    const usuario = document.getElementById("login-usuario").value;
    const password = document.getElementById("login-password").value;

    if (usuario === perfilGuardado.usuario && password === perfilGuardado.password) {
        // Guardar sesión en LocalStorage
        localStorage.setItem("usuarioActivo", usuario);
        mostrarRegistro();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

// Mostrar sección de registro
function mostrarRegistro() {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    if (usuarioActivo) {
        document.getElementById("usuario-actual").textContent = usuarioActivo;
        document.getElementById("login-container").style.display = "none";
        document.getElementById("registro-container").style.display = "block";
    }
}

// Función para registrar entrada o salida
function registrar(tipo) {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    const log = document.getElementById('log');
    if (!usuarioActivo) {
        alert('No hay un usuario activo. Inicia sesión primero.');
        return;
    }
    const fecha = new Date().toLocaleString();
    const registro = document.createElement('p');
    
    // Crear un contenedor para el registro con la imagen
    const registroContenedor = document.createElement('div');
    registroContenedor.classList.add('registro-item');
    
    // Crear el texto del registro
    const textoRegistro = document.createElement('span');
    textoRegistro.textContent = `${tipo.toUpperCase()}: ${usuarioActivo} - ${fecha}`;
    
    // Crear la imagen
    const imagen = document.createElement('img');
    imagen.src = tipo === 'entrada' ? 'images/entrada.png' : 'images/entrada.png';  // Cambia las imágenes según el tipo
    imagen.alt = tipo === 'entrada' ? 'Entrada registrada' : 'Salida registrada';
    imagen.classList.add('registro-imagen');
    
    // Agregar la imagen y el texto al contenedor
    registroContenedor.appendChild(imagen);
    registroContenedor.appendChild(textoRegistro);
    
    // Agregar el contenedor del registro al área de logs
    log.prepend(registroContenedor);
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    document.getElementById("login-container").style.display = "block";
    document.getElementById("registro-container").style.display = "none";
}

// Verificar sesión activa al cargar la página
window.onload = function () {
    if (localStorage.getItem("usuarioActivo")) {
        mostrarRegistro();
    }
};

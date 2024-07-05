document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.querySelector('#cliente-form');

    clienteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (guardarDatosUsuario()) {
            window.location.href = 'datosgenerales.html';
        }
    });
});

function validarDatosUsuario() {
    const nombresApellidos = document.getElementById("nombresApellidos").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const mensaje = "";

    // Validación de campos vacíos
    if (nombresApellidos === "" || cedula === "" || telefono === "" || correo === "" || direccion === "") {
        mensaje = "Por favor, completa todos los campos.";
    }
    // Validación de nombres y apellidos (no permitir números)
    else if (/\d/.test(nombresApellidos)) {
        mensaje = "El campo 'Nombres y Apellidos' no puede contener números.";
    }
    // Validación de cédula (debe tener 10 dígitos)
    else if (!(/^\d{10}$/.test(cedula))) {
        mensaje = "La cédula de identidad debe tener exactamente 10 dígitos.";
    }
    // Validación de teléfono (debe tener 10 dígitos)
    else if (!(/^\d{10}$/.test(telefono))) {
        mensaje = "El número de teléfono debe tener exactamente 10 dígitos. Solo números.";
    }
    // Validación de formato de correo electrónico
    else if (!(/\S+@gmail\.com$/.test(correo))) {
        mensaje = "El correo electrónico debe tener formato '@gmail.com'.";
    }
    // Validación de longitud de la dirección
    else if (direccion.length > 40) {
        mensaje = "La dirección residencial no puede exceder los 40 caracteres.";
    }

    // Si hay un mensaje de error, se muestra y se detiene el envío del formulario
    if (mensaje !== "") {
        document.getElementById("mensaje").innerText = mensaje;
        return false;
    }

    // Si todas las validaciones pasan, se permite enviar el formulario
    return true;
}

function guardarDatosUsuario() {
    if (!validarDatosUsuario()) {
        return false;
    }

    const cedula = document.querySelector('#cedula').value.trim();
    const nombresApellidos = document.querySelector('#nombresApellidos').value.trim();
    const telefono = document.querySelector('#telefono').value.trim();
    const correo = document.querySelector('#correo').value.trim();
    const direccion = document.querySelector('#direccion').value.trim();

    const Clientes = JSON.parse(localStorage.getItem('Clientes')) || [];
    const isClienteRegistered = Clientes.find(cliente => cliente.cedula === cedula);
    
    if (isClienteRegistered) {
        alert('¡El cliente ya está registrado!');
        return false;
    }

    Clientes.push({
        cedula: cedula,
        nombres: nombresApellidos,
        direccion: direccion,
        telefono: telefono,
        email: correo
    });

    localStorage.setItem('Clientes', JSON.stringify(Clientes));
    alert('¡Registro Exitoso!');
    return true;
}

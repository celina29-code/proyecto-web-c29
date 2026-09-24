console.log("el script se esta ejecutando");

const boton = document.querySelector("#ver-mas");
const extra = document.querySelector("#proyectos-extra");

if (boton && extra) {
    boton.addEventListener("click", function () {
        extra.classList.toggle("oculto");
    });
}


const formulario = document.querySelector("#contacto");

if (formulario) {
    const nombre = document.querySelector("#nombre");
    const correo = document.querySelector("#correo");
    const mensaje = document.querySelector("#mensaje");

    const errorNombre = document.querySelector("#error-nombre");
    const errorCorreo = document.querySelector("#error-correo");
    const errorMensaje = document.querySelector("#error-mensaje");

    const exito = document.querySelector("#mensaje-exito");

    // marca o limpia un campo y escribe su mensaje de error
    function marcar(campo, parrafo, texto) {
        parrafo.textContent = texto;
        if (texto === "") {
            campo.classList.remove("campo-invalido");
        } else {
            campo.classList.add("campo-invalido");
        }
    }

    // muestra el mensaje de cierre dentro de la pagina
    function mostrarExito(texto) {
        exito.textContent = texto;
        exito.classList.remove("oculto");
    }

    // lo esconde otra vez al empezar un envio nuevo
    function ocultarExito() {
        exito.textContent = "";
        exito.classList.add("oculto");
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();          // sin esto la pagina se recarga
        ocultarExito();                   // se limpia lo de la vez anterior

        let valido = true;

        // nombre: al menos 3 caracteres que no sean espacios
        if (nombre.value.trim().length < 3) {
            marcar(nombre, errorNombre, "Escriba su nombre completo");
            valido = false;
        } else {
            marcar(nombre, errorNombre, "");
        }

        // correo: no vacio, con arroba, y con un punto despues de la arroba
        const posArroba = correo.value.indexOf("@");

        if (correo.value.trim() === "") {
            marcar(correo, errorCorreo, "Escriba su correo");
            valido = false;
        } else if (posArroba === -1) {
            marcar(correo, errorCorreo, "Al correo le falta la arroba");
            valido = false;
        } else if (correo.value.indexOf(".", posArroba) === -1) {
            marcar(correo, errorCorreo, "Al correo le falta el punto despues de la arroba");
            valido = false;
        } else {
            marcar(correo, errorCorreo, "");
        }

        // mensaje: al menos 10 caracteres
        if (mensaje.value.trim().length < 10) {
            marcar(mensaje, errorMensaje, "Escriba un mensaje de al menos 10 letras");
            valido = false;
        } else {
            marcar(mensaje, errorMensaje, "");
        }

        if (valido) {
            fetch("https://formsubmit.co/ajax/celinaab2911@gmail.com", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  body: JSON.stringify({ nombre: nombre.value, correo: correo.value,
                         mensaje: mensaje.value, _captcha: "false" })
})
  .then(function () { formulario.reset(); mostrarExito("Su mensaje fue enviado."); })
  .catch(function () { mostrarExito("No se pudo enviar."); });
        }


    });
}


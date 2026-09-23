console.log("el script se esta ejecutando");

const boton = document.querySelector("#ver-mas");

const extra = document.querySelector("#proyectos-extra");

boton.addEventListener("click", function () {
    extra.classList.toggle("oculto");
});




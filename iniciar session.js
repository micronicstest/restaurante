const fondo = document.querySelector(".fondo");
const loginlink = document.querySelector(".login-link");
const registrarlink = document.querySelector(".registrar-link");
const iconocerrar = document.querySelector(".icono-cerrar");

registrarlink.addEventListener("click", () => {
    fondo.classList.add('active');
});

loginlink.addEventListener("click", () => {
    fondo.classList.remove('active');
});

iconocerrar.addEventListener("click", () => {
    fondo.classList.remove('active');
});

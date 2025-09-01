// Función para el contador regresivo
const fechaEvento = new Date("October 18, 2025 00:00:00").getTime();

const x = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Muestra el resultado
    document.getElementById("countdown").innerHTML = `<span class="tiempo">${dias}</span> días <span class="tiempo">${horas}</span> horas <span class="tiempo">${minutos}</span> minutos <span class="tiempo">${segundos}</span> segundos`;

    if (distancia < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "¡El evento ya empezó!";
    }
}, 1000);


// Función para animar las secciones al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    const elementosAnimables = document.querySelectorAll(".nombre-principal, .titulo-principal, .mensaje, .contador");
    const secciones = document.querySelectorAll(".seccion");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementosAnimables.forEach(elemento => {
        observer.observe(elemento);
    });

    secciones.forEach(seccion => {
        observer.observe(seccion);
    });

    // Controla la música
    const musica = document.getElementById('musica-fondo');
    if (musica) {
        musica.play().catch(error => {
            console.log("La reproducción automática fue bloqueada. El usuario debe interactuar para reproducir la música.");
        });
    }
});
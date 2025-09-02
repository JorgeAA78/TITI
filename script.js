// Función para el contador regresivo
const fechaEvento = new Date("October 18, 2025 21:00:00").getTime();

const x = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Muestra el resultado
    document.getElementById("countdown").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;

    if (distancia < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "¡La fiesta ya comenzó!";
    }
}, 1000);


// Función para animar elementos al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionamos TODOS los elementos que queremos animar
    const elementosAnimados = document.querySelectorAll(".tarjeta, #foto1, #foto2, #foto3, .icono");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Al volverse visible, reseteamos su opacidad y transformación
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translate(0)"; // Resetea translateX y translateY
                observer.unobserve(entry.target); // Dejamos de observarlo para que la animación no se repita
            }
        });
    }, {
        threshold: 0.1 // La animación se dispara cuando el 10% del elemento es visible
    });
    
    // Anima la sección principal de inmediato
    document.querySelector('#principal').style.opacity = "1";
    
    // Observamos cada elemento individualmente
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });

    // Controla la música
    const musica = document.getElementById('musica-fondo');
    if (musica) {
        musica.play().catch(error => {
            console.log("La reproducción automática fue bloqueada. Se necesita interacción del usuario.");
            document.body.addEventListener('click', () => musica.play(), { once: true });
        });
    }
});
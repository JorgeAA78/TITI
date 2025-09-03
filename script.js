// Función para el contador regresivo
const fechaEvento = new Date("October 18, 2025 21:00:00").getTime();
const countdownContainer = document.getElementById('countdown'); 

const x = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    if (countdownContainer) {
        countdownContainer.innerHTML = `
            <div class="tiempo-item">
                <span class="numero">${dias}</span>
                <span class="label">Días</span>
            </div>
            <div class="tiempo-item">
                <span class="numero">${horas}</span>
                <span class="label">Horas</span>
            </div>
            <div class="tiempo-item">
                <span class="numero">${minutos}</span>
                <span class="label">Minutos</span>
            </div>
            <div class="tiempo-item">
                <span class="numero">${segundos}</span>
                <span class="label">Segundos</span>
            </div>
        `;
    }

    if (distancia < 0) {
        clearInterval(x);
        if (countdownContainer) {
            countdownContainer.innerHTML = "¡La fiesta ya comenzó!";
        }
    }
}, 1000);


// Función para animar elementos y controlar la música
document.addEventListener("DOMContentLoaded", function() {
    // DESPUÉS
const elementosAnimados = document.querySelectorAll(".tarjeta, #foto1, #foto2, #foto3, .icono, .countdown, .despedida-subtitulo, .despedida-titulo, .boton-enlace");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });

    // Controlador de música
    const musica = document.getElementById('musica-fondo');
    const playButton = document.querySelector('.play');

    if (playButton) {
        if (!musica.paused) {
            playButton.textContent = '❚❚';
        }

        playButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (musica.paused) {
                musica.play();
                playButton.textContent = '❚❚';
            } else {
                musica.pause();
                playButton.textContent = '▶';
            }
        });
    }

    musica.play().catch(() => {
        document.body.addEventListener('click', () => {
            musica.play();
            if (playButton) {
                playButton.textContent = '❚❚';
            }
        }, { once: true });
    });
});
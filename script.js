// --- FUNCIÓN PARA EL CONTADOR REGRESIVO ---
const fechaEvento = new Date("October 18, 2025 21:00:00").getTime();
const countdownContainer = document.getElementById('countdown');

// Creamos la estructura HTML del contador una sola vez para mejorar el rendimiento.
if (countdownContainer) {
    countdownContainer.innerHTML = `
        <div class="tiempo-item">
            <span class="numero" id="dias">0</span>
            <span class="label">Días</span>
        </div>
        <div class="tiempo-item">
            <span class="numero" id="horas">0</span>
            <span class="label">Horas</span>
        </div>
        <div class="tiempo-item">
            <span class="numero" id="minutos">0</span>
            <span class="label">Minutos</span>
        </div>
        <div class="tiempo-item">
            <span class="numero" id="segundos">0</span>
            <span class="label">Segundos</span>
        </div>
    `;
}

// Obtenemos las referencias a los elementos que vamos a actualizar.
const diasElem = document.getElementById('dias');
const horasElem = document.getElementById('horas');
const minutosElem = document.getElementById('minutos');
const segundosElem = document.getElementById('segundos');


const intervalo = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    // Si el evento ya pasó, detenemos el contador.
    if (distancia < 0) {
        clearInterval(intervalo);
        if (countdownContainer) {
            countdownContainer.innerHTML = "¡La fiesta ya comenzó!";
        }
        return; // Salimos de la función para no seguir calculando.
    }

    // Cálculos de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Actualizamos solo el texto de los números, que es más eficiente.
    if (diasElem) diasElem.textContent = dias;
    if (horasElem) horasElem.textContent = horas;
    if (minutosElem) minutosElem.textContent = minutos;
    if (segundosElem) segundosElem.textContent = segundos;

}, 1000);


// --- FUNCIÓN PARA ANIMAR ELEMENTOS AL HACER SCROLL Y CONTROLAR MÚSICA ---
document.addEventListener("DOMContentLoaded", function() {
    // 1. ANIMACIÓN DE ENTRADA
    // Selector simplificado gracias a la clase .animar-entrada en el HTML.
    const elementosAnimados = document.querySelectorAll('.animar-entrada');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Cuando un elemento animado entra en la pantalla...
            if (entry.isIntersecting) {
                // ...le añadimos la clase 'visible' para que se active la animación CSS.
                entry.target.classList.add('visible');
                // Dejamos de observar el elemento para que la animación no se repita.
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // La animación se dispara cuando el 10% del elemento es visible.
    });
    
    // Le decimos al observador que vigile cada uno de los elementos animados.
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });

    // 2. CONTROLADOR DE MÚSICA
    // Esta parte estaba muy bien, así que la mantenemos casi igual.
    const musica = document.getElementById('musica-fondo');
    const playButton = document.querySelector('.play');

    if (musica && playButton) {
        // Revisa si la música ya está sonando (por el autoplay)
        if (!musica.paused) {
            playButton.textContent = '❚❚'; // Icono de pausa
        }

        playButton.addEventListener('click', () => {
            if (musica.paused) {
                musica.play();
                playButton.textContent = '❚❚';
            } else {
                musica.pause();
                playButton.textContent = '▶'; // Icono de play
            }
        });
        
        // Manejo de la política de autoplay de los navegadores.
        // Si el autoplay falla, la música empezará con el primer clic del usuario en la página.
        musica.play().catch(() => {
            document.body.addEventListener('click', () => {
                if(musica.paused){ // Solo si aún no ha empezado
                    musica.play();
                    playButton.textContent = '❚❚';
                }
            }, { once: true }); // El evento se ejecuta solo una vez.
        });
    }
});
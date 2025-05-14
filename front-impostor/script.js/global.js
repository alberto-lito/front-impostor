
//<!----------------------------aqui va el js------------------------------------------------------>

//para el menu oculto

    const menuIcon = document.getElementById("menu");
    const menuOculto = document.getElementById("menu-oculto");
  
    menuIcon.addEventListener("click", () => {
      const currentDisplay = window.getComputedStyle(menuOculto).display;
      const isHidden = currentDisplay === "none";
  
      menuOculto.style.display = isHidden ? "block" : "none";
      menuIcon.classList.toggle("activo", isHidden); // Solo agregar si se muestra
    });

  
//!----------------------------------------------------------------------------------------->

//--para la reproducciona automatica con modal de bienvenida -->


// Sonidos globales

// === index.js ===

// Cargar los audios
const efectoSonido = new Audio('./musica/sonido de botones/boton-4.mp3');
const musicaFondo = new Audio('./musica/musica de pagina/fondo.mp3');
musicaFondo.loop = true;

window.addEventListener("DOMContentLoaded", () => {
    const musicaSlider = document.getElementById('musicaVolume');
    const sonidoSlider = document.getElementById('sonidoVolume');

    musicaFondo.volume = parseFloat(musicaSlider.value);
    musicaSlider.addEventListener('input', () => {
        musicaFondo.volume = parseFloat(musicaSlider.value);
    });

    efectoSonido.volume = parseFloat(sonidoSlider.value);
    sonidoSlider.addEventListener('input', () => {
        efectoSonido.volume = parseFloat(sonidoSlider.value);
    });
});

const modal = document.getElementById('modalBienvenida');
const botonIniciarMusica = document.getElementById('iniciarMusicaBtn');

function mostrarModal() {
    modal.style.display = 'flex';
}

function iniciarMusica() {
    musicaFondo.play().catch(console.error);
    modal.style.display = 'none';
}

botonIniciarMusica.addEventListener('click', iniciarMusica);
window.onload = mostrarModal;

// SONIDO: botones con .btn y #btn
function asignarSonidoABotones() {
    document.querySelectorAll('.btn, #btn').forEach(btn => {
        btn.addEventListener('click', () => {
            efectoSonido.currentTime = 0;
            efectoSonido.play();
        });
    });
}

let contenidoInicial = document.getElementById('ventana-principal').innerHTML;

function asignarBotonCategorias() {
    document.getElementById('btn-categorias')?.addEventListener('click', () => {
        fetch('secciones/categorias.html')
            .then(res => res.text())
            .then(data => {
                document.getElementById('ventana-principal').innerHTML = data;
                inicializarCaracteristicas();
                asignarSonidoABotones(); // Reasignar sonidos a botones nuevos
            })
            .catch(err => console.error('Error al cargar sección:', err));
    });
}

function inicializarEfectosTarjetas() {
    document.querySelectorAll('.tarjeta').forEach(tarjeta => {
        tarjeta.addEventListener('mousedown', () => tarjeta.classList.add('clickeada'));
        tarjeta.addEventListener('mouseup', () => tarjeta.classList.remove('clickeada'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    asignarBotonCategorias();
    inicializarEfectosTarjetas();
    asignarSonidoABotones(); // Inicial
});



//--------------------seleccion de bander y futura traduccion-------------------------------------------------------->


    document.addEventListener('DOMContentLoaded', () => {
        const argentina = document.querySelector('.arg-hover');
        const ingles = document.querySelector('.ing-hover');

        // Función para manejar el clic en las banderas
        const toggleActive = (clickedFlag, otherFlag) => {
            clickedFlag.classList.add('active');
            otherFlag.classList.remove('active');
        };

        // Evento de clic para la bandera argentina
        argentina.addEventListener('click', () => {
            toggleActive(argentina, ingles);
            // Aquí podrías agregar la función de cambiar el idioma si ya está implementada
        });

        // Evento de clic para la bandera de inglés
        ingles.addEventListener('click', () => {
            toggleActive(ingles, argentina);
            // Aquí también podrías agregar la función de cambiar el idioma
        });
    });


//-----------------------------modo seleccion de juego - evento click por ahora --------------------------------------------->

    document.addEventListener('DOMContentLoaded', () => {
        const colorPElements = document.querySelectorAll('.color-p');

        // Función para aplicar la clase active y mantener el hover
        const toggleModeActive = (clickedElement) => {
            colorPElements.forEach((element) => {
                // Elimina la clase active de todos los elementos
                element.classList.remove('active');
            });
            // Añade la clase active al elemento clickeado
            clickedElement.classList.add('active');
        };

        // Añadir evento de clic a los elementos con clase .color-p
        colorPElements.forEach((element) => {
            element.addEventListener('click', () => {
                toggleModeActive(element);
            });
        });
    });

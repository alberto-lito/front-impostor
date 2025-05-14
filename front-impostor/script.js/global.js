// ========== MENÚ OCULTO ==========
const menuIcon = document.getElementById("menu");
const menuOculto = document.getElementById("menu-oculto");

menuIcon.addEventListener("click", () => {
  const currentDisplay = window.getComputedStyle(menuOculto).display;
  const isHidden = currentDisplay === "none";
  menuOculto.style.display = isHidden ? "block" : "none";
  menuIcon.classList.toggle("activo", isHidden);
});



// ========== SONIDO Y MÚSICA ==========
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

function asignarSonidoABotones() {
  document.querySelectorAll('.btn, #btn').forEach(btn => {
    btn.addEventListener('click', () => {
      efectoSonido.currentTime = 0;
      efectoSonido.play();
    });
  });
}



// ========== BANDERAS ==========
document.addEventListener('DOMContentLoaded', () => {
  const argentina = document.querySelector('.arg-hover');
  const ingles = document.querySelector('.ing-hover');

  const toggleActive = (clickedFlag, otherFlag) => {
    clickedFlag.classList.add('active');
    otherFlag.classList.remove('active');
  };

  argentina.addEventListener('click', () => toggleActive(argentina, ingles));
  ingles.addEventListener('click', () => toggleActive(ingles, argentina));
});

// ========== MODO DE JUEGO ==========
document.addEventListener('DOMContentLoaded', () => {
  const colorPElements = document.querySelectorAll('.color-p');

  colorPElements.forEach((element) => {
    element.addEventListener('click', () => {
      colorPElements.forEach(el => el.classList.remove('active'));
      element.classList.add('active');
    });
  });
});


// ========== INICIO ==========
document.addEventListener('DOMContentLoaded', () => {
  asignarBotonCategorias();
  inicializarEfectosTarjetas();
  asignarSonidoABotones();
});


// ========== EFECTOS TARJETAS ==========
function inicializarEfectosTarjetas() {
  document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    tarjeta.addEventListener('mousedown', () => tarjeta.classList.add('clickeada'));
    tarjeta.addEventListener('mouseup', () => tarjeta.classList.remove('clickeada'));
  });
}


// =================== sonido click en categorias ====================

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos los ítems de categorías (suponiendo que tienen la clase .item-categoria)
    const itemsCategoria = document.querySelectorAll('.item-categoria');

    // Añadimos un evento de clic a cada ítem de categoría
    itemsCategoria.forEach((item) => {
        item.addEventListener('click', () => {
            // Reproducimos el sonido de botón cuando se hace clic
            efectoSonido.currentTime = 0;  // Resetea el tiempo del sonido
            efectoSonido.play();          // Reproduce el sonido
        });
    });
});


// ========== CATEGORÍAS DINÁMICAS ==========
const contenedorVentana = document.getElementById('ventana-principal');
let contenidoInicial = contenedorVentana.innerHTML;
let seleccionadosCategorias = {};

function asignarEventosCategorias() {
  // Eventos de selección de categorías
  document.querySelectorAll('.tarjetas span').forEach(span => {
    span.addEventListener('click', () => {
      const tarjeta = span.closest('.tarjetas');
      const categoria = tarjeta.querySelector('h2').textContent.trim();

      if (!seleccionadosCategorias[categoria]) {
        seleccionadosCategorias[categoria] = new Set();
      }

      const yaSeleccionado = span.classList.contains('activo-verde');

      if (yaSeleccionado) {
        span.classList.remove('activo-verde');
        seleccionadosCategorias[categoria].delete(span.textContent.trim());
      } else {
        if (seleccionadosCategorias[categoria].size < 6) {
          span.classList.add('activo-verde');
          seleccionadosCategorias[categoria].add(span.textContent.trim());
        } else {
          alert(`Máximo 6 en ${categoria}`);
        }
      }

      // Actualizar contador
      document.querySelectorAll('.ctn').forEach(ctn => {
        const titulo = ctn.querySelector('p').textContent.trim();
        if (titulo === categoria) {
          ctn.querySelector('span').textContent = seleccionadosCategorias[categoria].size;
        }
      });
    });
  });

  // Botón Guardar
  document.querySelector('.btn-select.verde')?.addEventListener('click', () => {
    console.log('Guardado:', seleccionadosCategorias);
    alert('Categorías guardadas correctamente.');
  });

  // Botón Volver
  document.querySelector('.btn-select.rojo')?.addEventListener('click', () => {
    contenedorVentana.innerHTML = contenidoInicial;
    asignarBotonCategorias();
    inicializarEfectosTarjetas();
    asignarSonidoABotones();
  });

  asignarSonidoABotones(); // Reasignar sonido
}


// Botón para abrir categorías
function asignarBotonCategorias() {
  document.getElementById('btn-categorias')?.addEventListener('click', () => {
    fetch('secciones/categorias.html')
      .then(res => res.text())
      .then(data => {
        contenedorVentana.innerHTML = data;
        seleccionadosCategorias = {}; // Reiniciar
        asignarEventosCategorias();
        asignarSonidoABotones(); // Para los botones cargados dinámicamente
      })
      .catch(err => console.error('Error al cargar sección:', err));
  });
}

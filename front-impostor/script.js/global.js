// ========== MENÚ OCULTO ==========

const menuIcon = document.getElementById("menu");
const menuOculto = document.getElementById("menu-oculto");

menuIcon.addEventListener("click", () => {
  const currentDisplay = window.getComputedStyle(menuOculto).display;
  const isHidden = currentDisplay === "none";
  menuOculto.style.display = isHidden ? "block" : "none";
  menuIcon.classList.toggle("activo", isHidden);

  // Sonido al hacer click en el ícono del menú

  efectoSonido.currentTime = 0;
  efectoSonido.play();
});



// Cierra el menú si se hace clic por  fuera de él

document.addEventListener('click', function (event) {
  const isClickInsideMenu = menuOculto.contains(event.target);
  const isClickOnMenuIcon = menuIcon.contains(event.target);

  if (!isClickInsideMenu && !isClickOnMenuIcon) {
    menuOculto.style.display = 'none';
    menuIcon.classList.remove('activo');
  }
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
  document.querySelectorAll('.btn, #btn, #btn-aprende, #btn-juega').forEach(btn => {
    btn.addEventListener('click', () => {
      efectoSonido.currentTime = 0;
      efectoSonido.play();
    });
  });
}
asignarSonidoABotones(); 


// ========== BANDERAS ==========

document.addEventListener('DOMContentLoaded', () => {
  const argentina = document.querySelector('.arg-hover');
  const ingles = document.querySelector('.ing-hover');

  const toggleActive = (clickedFlag, otherFlag) => {
    clickedFlag.classList.add('active');
    otherFlag.classList.remove('active');

    // Sonido al hacer click en bandera

    efectoSonido.currentTime = 0;
    efectoSonido.play();
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

      // Sonido al seleccionar modo de juego

      efectoSonido.currentTime = 0;
      efectoSonido.play();
    });
  });
});


// ========== INICIO ==========

document.addEventListener('DOMContentLoaded', () => {
  asignarBotonCategorias();
  asignarBotonAprende();
  asignarBotonJuega();
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

// ========== SONIDO CLICK EN CATEGORÍAS ==========

document.addEventListener('DOMContentLoaded', () => {
  const itemsCategoria = document.querySelectorAll('.item-categoria');

  itemsCategoria.forEach((item) => {
    item.addEventListener('click', () => {
      efectoSonido.currentTime = 0;
      efectoSonido.play();
    });
  });
});

// ========== CATEGORÍAS DINÁMICAS ==========

const contenedorVentana = document.getElementById('ventana-principal');
let contenidoInicial = contenedorVentana.innerHTML;
let seleccionadosCategorias = {};

function asignarEventosCategorias() {

  // Eventos para seleccionar opciones dentro de tarjetas

  document.querySelectorAll('.tarjetas span').forEach(span => {
    span.addEventListener('click', () => {
      const tarjeta = span.closest('.tarjetas');
      const categoria = tarjeta.querySelector('h2').textContent.trim();

      if (!seleccionadosCategorias[categoria]) {
        seleccionadosCategorias[categoria] = new Set();
      }

      const yaSeleccionado = span.classList.contains('active-ops-tarjetas');

      if (yaSeleccionado) {
        span.classList.remove('active-ops-tarjetas');
        seleccionadosCategorias[categoria].delete(span.textContent.trim());
      } else {
        if (seleccionadosCategorias[categoria].size < 6) {
          span.classList.add('active-ops-tarjetas');
          seleccionadosCategorias[categoria].add(span.textContent.trim());
        } else {
          alert(`Máximo 6 en ${categoria}`);
        }
      }

      efectoSonido.currentTime = 0;
      efectoSonido.play();

      // Actualizar contador

      document.querySelectorAll('.ctn').forEach(ctn => {
        const titulo = ctn.querySelector('p').textContent.trim();
        if (titulo === categoria) {
          ctn.querySelector('span').textContent = seleccionadosCategorias[categoria].size;
        }
      });
    });
  });

  // Botón Guardar (verde)

  document.querySelector('.btn-select.verde')?.addEventListener('click', function () {
    this.classList.add('activo-verde');
    console.log('Guardado:', seleccionadosCategorias);
    alert('Categorías guardadas correctamente.');
  });

  // Botón Volver (rojo)
  
  document.querySelector('.btn-select.rojo')?.addEventListener('click', function () {
    this.classList.add('activo-rojo');
    contenedorVentana.innerHTML = contenidoInicial;
    asignarBotonCategorias();
    asignarBotonAprende();
    asignarBotonJuega();
    inicializarEfectosTarjetas();
    asignarSonidoABotones();
  });

  asignarSonidoABotones(); 
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


// Botón para abrir aprende (tutorial)

function asignarBotonAprende() {
  document.getElementById('btn-aprende')?.addEventListener('click', () => {
    fetch('secciones/tutorial.html')
      .then(res => res.text())
      .then(data => {
        contenedorVentana.innerHTML = data;
        asignarEventosBotonVolver();
        asignarSonidoABotones();
      })
      .catch(err => console.error('Error al cargar tutorial:', err));
  });
}

// Botón para abrir juega (juego)

function asignarBotonJuega() {
  document.getElementById('btn-juega')?.addEventListener('click', () => {
    fetch('secciones/juego.html')
      .then(res => res.text())
      .then(data => {
        contenedorVentana.innerHTML = data;
        asignarEventosBotonVolver();
        asignarSonidoABotones();
      })
      .catch(err => console.error('Error al cargar juego:', err));
  });
}

// Botón volver (rojo) para tutorial y juego

function asignarEventosBotonVolver() {
  const botonesVolver = contenedorVentana.querySelectorAll('.volver');
  
  botonesVolver.forEach(btn => {
    btn.addEventListener('click', () => {
      efectoSonido.currentTime = 0;
      efectoSonido.play();

      contenedorVentana.innerHTML = contenidoInicial;

      asignarBotonCategorias();
      asignarBotonAprende();
      asignarBotonJuega();
      inicializarEfectosTarjetas();
      asignarSonidoABotones();
    });
  });


}

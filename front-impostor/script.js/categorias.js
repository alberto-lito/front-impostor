
document.addEventListener('DOMContentLoaded', () => {
  const categorias = ['General', 'Cine', 'Deportes', 'Comidas', 'Niños', 'Viajes'];
  const maxPorCategoria = 6;

  // Map para rastrear los seleccionados por categoría
  const seleccionados = {};

  categorias.forEach(cat => seleccionados[cat] = new Set());

  // Obtener todos los spans dentro de .tarjetas
  const spans = document.querySelectorAll('.tarjetas span');

  spans.forEach(span => {
    span.addEventListener('click', () => {
      const tarjeta = span.closest('.tarjetas');
      const categoria = tarjeta.querySelector('h2').textContent.trim();

      // Si ya estaba seleccionada
      const yaSeleccionado = span.classList.contains('activo-verde');

      if (yaSeleccionado) {
        span.classList.remove('activo-verde');
        seleccionados[categoria].delete(span.textContent.trim());
      } else {
        if (seleccionados[categoria].size < maxPorCategoria) {
          span.classList.add('activo-verde');
          seleccionados[categoria].add(span.textContent.trim());
        } else {
          alert(`Máximo de ${maxPorCategoria} elementos en ${categoria}`);
        }
      }

      // Actualizar contador visual
      actualizarContador(categoria);
    });
  });

  function actualizarContador(categoria) {
    const contadores = document.querySelectorAll('.ctn');
    contadores.forEach(ctn => {
      const titulo = ctn.querySelector('p').textContent.trim();
      if (titulo === categoria) {
        const spanContador = ctn.querySelector('span');
        spanContador.textContent = seleccionados[categoria].size;
      }
    });
  }

  // Botones con clase activa
  const btnVerde = document.querySelector('.btn-select.verde');
  const btnRojo = document.querySelector('.btn-select.rojo');

  btnVerde.addEventListener('click', () => {
    btnVerde.classList.toggle('activo-verde');
  });

  btnRojo.addEventListener('click', () => {
    btnRojo.classList.toggle('activo-rojo');
  });
});


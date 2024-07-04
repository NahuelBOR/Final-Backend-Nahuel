function obtenerFechaActual() {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = String(fechaActual.getFullYear());

    return `${dia}/${mes}/${anio}`;
}

export default obtenerFechaActual;
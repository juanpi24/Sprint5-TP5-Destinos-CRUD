// Traduce un error de axios a un mensaje claro para el usuario.
// axios rechaza ante cualquier status fuera de 2xx, y trae la respuesta en err.response.
export function obtenerMensajeError(err) {
  // El servidor respondió, pero con un error (404, 500...)
  if (err.response) {
    return `El servidor respondió con un error (${err.response.status}). Intentá de nuevo en unos minutos.`;
  }

  // Se cumplió el tiempo máximo de espera
  if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
    return 'El servidor tardó demasiado en responder. Intentá de nuevo.';
  }

  // Sin respuesta: red caída, servidor apagado, CORS...
  return 'No se pudo conectar con el servidor. Revisá tu conexión e intentá de nuevo.';
}

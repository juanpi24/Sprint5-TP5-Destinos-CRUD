import { api } from './axiosInstance.js';

// Una función por operación del CRUD. Devuelven la respuesta de axios (los datos están en .data).

// GET /destinos
export async function listarDestinos(params, headers = {}, signal) {
  return await api.get('/destinos', { params, headers, signal });
}

// POST. Crear nuevo destino -  /destinos  (MockAPI asigna el id)
export async function crearDestino(destino, headers = {}) {
  return await api.post('/destinos', destino, { headers });
}

// PUT: Actualizar destino -  /destinos/:id
export async function actualizarDestino(id, destino, headers = {}) {
  return await api.put(`/destinos/${id}`, destino, { headers });
}

// DELETE: Eliminar destino -  /destinos/:id
export async function eliminarDestino(id, headers = {}) {
  return await api.delete(`/destinos/${id}`, { headers });
}

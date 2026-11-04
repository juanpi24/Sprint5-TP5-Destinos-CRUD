import axios from 'axios';

// Instancia única con la configuración común: URL base (desde .env), headers y tiempo máximo de espera.
// Todas las funciones de api/ usan este "api"; ningún componente conoce la URL ni usa axios directo.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

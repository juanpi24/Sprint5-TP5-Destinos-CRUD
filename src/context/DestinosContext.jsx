import { createContext, useContext, useEffect, useState } from 'react';
import {
  listarDestinos,
  crearDestino,
  actualizarDestino,
  eliminarDestino,
} from '../api/destinosApi.js';
import { obtenerMensajeError } from '../api/errores.js';

// El contexto nunca se exporta.
const DestinosContext = createContext(null);

/**
 * Maneja el ESTADO del recurso (la lista y su carga/error) y expone las acciones.
 * No arma URLs ni conoce axios: para hablar con el backend llama a las funciones de api/.
 * El feedback al usuario (toasts, navegación) lo hacen las páginas, no el contexto.
 */
export function DestinosProvider({ children }) {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0); // sube de a uno cada vez que se pide recargar

  // Carga inicial de la lista (y cada vez que se toca "Reintentar")
  useEffect(() => {
    const controller = new AbortController();

    const cargar = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await listarDestinos({}, {}, controller.signal);
        setDestinos(data);
      } catch (err) {
        // Si la petición fue cancelada a propósito, no es un error
        if (!controller.signal.aborted) setError(obtenerMensajeError(err));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    cargar();

    return () => controller.abort();
  }, [intento]);

  const recargar = () => setIntento((n) => n + 1);

  // Las tres acciones primero hablan con el backend y, SOLO si salió bien, actualizan el estado.
  // Si la petición falla, el error se propaga a quien llamó (la página muestra el aviso)
  // y el estado queda como estaba. Nunca se muta el arreglo: siempre se crea uno nuevo.

  const crear = async (datos) => {
    const { data } = await crearDestino(datos);
    setDestinos((prev) => [...prev, data]);
    return data;
  };

  const actualizar = async (id, datos) => {
    const { data } = await actualizarDestino(id, datos);
    setDestinos((prev) => prev.map((d) => (d.id === id ? data : d)));
    return data;
  };

  const eliminar = async (id) => {
    await eliminarDestino(id);
    setDestinos((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DestinosContext.Provider
      value={{
        destinos,
        loading,
        error,
        recargar,
        crear,
        actualizar,
        eliminar,
      }}
    >
      {children}
    </DestinosContext.Provider>
  );
}

// Hook consumidor con guardia: si se usa afuera del Provider, falla explícito.
// eslint-disable-next-line react-refresh/only-export-components
export function useDestinosContext() {
  const contexto = useContext(DestinosContext);

  if (!contexto) {
    throw new Error(
      'useDestinosContext() tiene que usarse adentro de <DestinosProvider>',
    );
  }

  return contexto;
}

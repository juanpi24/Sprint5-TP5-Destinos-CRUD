import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDestinosContext } from '../context/DestinosContext.jsx';
import { obtenerMensajeError } from '../api/errores.js';
import { normalizarTexto } from '../utils/texto.js';
import { DestinoCard } from '../components/destinos/DestinoCard.jsx';
import { FiltrosDestinos } from '../components/destinos/FiltrosDestinos.jsx';
import { ConfirmationModal } from '../components/ui/ConfirmationModal.jsx';
import { Cargando } from '../components/ui/Cargando.jsx';
import { MensajeError } from '../components/ui/MensajeError.jsx';

export function ListaPage() {
  const { destinos, loading, error, recargar, eliminar } = useDestinosContext();
  // El destino que se quiere borrar (null = el modal de confirmación está cerrado)
  const [aEliminar, setAEliminar] = useState(null);

  // Filtros: estado local, porque solo esta pantalla los usa
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  // La lista filtrada se DERIVA en cada render a partir de "destinos" y los filtros:
  // no se guarda en un estado aparte (así nunca queda desactualizada al crear, editar o borrar).
  // Como la lista completa ya está en memoria, se filtra acá, sin pedir nada a la API.
  const textoBuscado = normalizarTexto(busqueda.trim());
  const destinosFiltrados = destinos.filter(
    (destino) =>
      (categoria === '' || destino.categoria === categoria) &&
      normalizarTexto(destino.titulo).includes(textoBuscado),
  );
  const hayFiltros = busqueda.trim() !== '' || categoria !== '';

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoria('');
  };

  const confirmarEliminar = async () => {
    try {
      await eliminar(aEliminar.id);
      toast.success(`"${aEliminar.titulo}" se eliminó correctamente`);
    } catch (err) {
      toast.error(obtenerMensajeError(err));
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-syne text-2xl font-bold text-on-surface">
            Destinos
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Administrá los destinos turísticos: ver, crear, editar y eliminar.
          </p>
        </div>
      </div>

      {loading && <Cargando mensaje="Cargando destinos..." />}
      {error && <MensajeError mensaje={error} onReintentar={recargar} />}

      {/* No hay ningún destino cargado en la API */}
      {!loading && !error && destinos.length === 0 && (
        <p className="py-10 text-center text-on-surface-variant">
          Todavía no hay destinos. Creá el primero con el botón "Nuevo destino".
        </p>
      )}

      {!loading && !error && destinos.length > 0 && (
        <>
          <FiltrosDestinos
            busqueda={busqueda}
            onBuscar={setBusqueda}
            categoria={categoria}
            onCategoria={setCategoria}
            hayFiltros={hayFiltros}
            onLimpiar={limpiarFiltros}
          />

          <p aria-live="polite" className="text-sm text-on-surface-variant">
            Mostrando {destinosFiltrados.length} de {destinos.length} destinos
          </p>

          {destinosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinosFiltrados.map((destino) => (
                <DestinoCard
                  key={destino.id}
                  destino={destino}
                  onEliminar={setAEliminar}
                />
              ))}
            </div>
          ) : (
            /* Hay destinos, pero ninguno coincide con los filtros */
            <section className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-2xl p-8 bg-surface-container/40 text-center">
              <div className="text-4xl mb-3" aria-hidden="true">
                🔎
              </div>
              <h2 className="text-lg font-bold text-on-surface mb-1">
                No encontramos destinos con esa búsqueda
              </h2>
              <p className="text-sm text-on-surface-variant max-w-xs">
                Probá con otro nombre o elegí otra categoría.
              </p>
              <button
                type="button"
                onClick={limpiarFiltros}
                className="mt-4 cursor-pointer rounded-full border border-outline-variant/40 bg-surface-container-high px-4 py-1.5 text-xs font-semibold text-primary hover:bg-surface-container-highest"
              >
                Ver todos los destinos
              </button>
            </section>
          )}
        </>
      )}

      <ConfirmationModal
        abierto={aEliminar !== null}
        onCerrar={() => setAEliminar(null)}
        onConfirmar={confirmarEliminar}
        titulo="Eliminar destino"
        mensaje={`¿Seguro que querés eliminar "${aEliminar?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </section>
  );
}

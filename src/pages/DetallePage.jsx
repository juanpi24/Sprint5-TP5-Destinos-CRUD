import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDestinosContext } from '../context/DestinosContext.jsx';
import { obtenerMensajeError } from '../api/errores.js';
import { formatearPrecio } from '../utils/formato.js';
import { ConfirmationModal } from '../components/ui/ConfirmationModal.jsx';
import { Cargando } from '../components/ui/Cargando.jsx';
import { MensajeError } from '../components/ui/MensajeError.jsx';
import { NoEncontrado } from '../components/ui/NoEncontrado.jsx';

export function DetallePage() {
  // useParams devuelve el :id de la URL siempre como string (igual que el id de MockAPI)
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinos, loading, error, recargar, eliminar } = useDestinosContext();
  const [confirmando, setConfirmando] = useState(false);

  if (loading) return <Cargando mensaje="Cargando destino..." />;
  if (error) return <MensajeError mensaje={error} onReintentar={recargar} />;

  const destino = destinos.find((d) => d.id === id);
  if (!destino) {
    return (
      <NoEncontrado
        titulo="Este destino no existe"
        mensaje="Puede que haya sido eliminado o que el enlace sea incorrecto."
      />
    );
  }

  const handleEliminar = async () => {
    try {
      await eliminar(destino.id);
      toast.success(`"${destino.titulo}" se eliminó correctamente`);
      navigate('/destinos');
    } catch (err) {
      toast.error(obtenerMensajeError(err));
    }
  };

  return (
    <section className="space-y-6">
      <Link to="/destinos" className="text-sm text-primary hover:underline">
        ← Volver a destinos
      </Link>

      <article className="overflow-hidden rounded-default border border-outline-variant bg-surface-container">
        <img src={destino.imagen} alt={destino.titulo} className="h-64 w-full object-cover sm:h-80" />

        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-syne text-2xl font-bold text-on-surface">{destino.titulo}</h1>
            {destino.destacado && (
              <span className="rounded-full bg-tertiary-container px-3 py-1 text-xs font-bold text-on-surface">
                ★ Destacado
              </span>
            )}
            {destino.stock === 0 && (
              <span className="rounded-full bg-error-container px-3 py-1 text-xs font-bold text-on-error-container">
                Sin stock
              </span>
            )}
          </div>

          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-on-surface-variant">Ubicación</dt>
              <dd className="font-medium text-on-surface">{destino.ubicacion}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Categoría</dt>
              <dd className="font-medium text-on-surface">{destino.categoria}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Calificación</dt>
              <dd className="font-medium text-on-surface">{destino.rating} / 5</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Stock</dt>
              <dd className="font-medium text-on-surface">{destino.stock} lugares</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Precio</dt>
              <dd className="text-lg font-bold text-primary">{formatearPrecio(destino.precio)}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to={`/destinos/${destino.id}/editar`}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-on-primary hover:opacity-90"
            >
              Editar
            </Link>
            <button
              type="button"
              onClick={() => setConfirmando(true)}
              className="cursor-pointer rounded-full border border-error px-5 py-2 text-sm font-semibold text-error hover:bg-error-container hover:text-on-error-container"
            >
              Eliminar
            </button>
          </div>
        </div>
      </article>

      <ConfirmationModal
        abierto={confirmando}
        onCerrar={() => setConfirmando(false)}
        onConfirmar={handleEliminar}
        titulo="Eliminar destino"
        mensaje={`¿Seguro que querés eliminar "${destino.titulo}"? Esta acción no se puede deshacer.`}
      />
    </section>
  );
}

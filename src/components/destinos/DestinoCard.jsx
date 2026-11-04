import { Link } from 'react-router-dom';
import { formatearPrecio } from '../../utils/formato.js';

export function DestinoCard({ destino, onEliminar }) {
  const { id, titulo, ubicacion, categoria, rating, destacado, precio, stock, imagen } = destino;

  return (
    <article className="flex flex-col overflow-hidden rounded-default border border-outline-variant bg-surface-container">
      <div className="relative">
        <img src={imagen} alt={titulo} loading="lazy" className="h-48 w-full object-cover" />

        {destacado && (
          <span className="absolute top-3 left-3 rounded-full bg-tertiary-container px-3 py-1 text-xs font-bold text-on-surface">
            ★ Destacado
          </span>
        )}
        {stock === 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-error-container px-3 py-1 text-xs font-bold text-on-error-container">
            Sin stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="font-syne text-lg font-bold text-on-surface">{titulo}</h2>
        <p className="text-sm text-on-surface-variant">
          {ubicacion} · {categoria}
        </p>
        <p className="text-sm text-on-surface-variant">Calificación: {rating} / 5</p>
        <p className="mt-1 text-lg font-bold text-primary">{formatearPrecio(precio)}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <Link
            to={`/destinos/${id}`}
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-on-primary hover:opacity-90"
          >
            Ver detalle
          </Link>
          <Link
            to={`/destinos/${id}/editar`}
            className="rounded-full border border-outline-variant/40 bg-surface-container-high px-4 py-1.5 text-xs font-semibold text-on-surface hover:bg-surface-container-highest"
          >
            Editar
          </Link>
          <button
            type="button"
            onClick={() => onEliminar(destino)}
            className="cursor-pointer rounded-full border border-error px-4 py-1.5 text-xs font-semibold text-error hover:bg-error-container hover:text-on-error-container"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

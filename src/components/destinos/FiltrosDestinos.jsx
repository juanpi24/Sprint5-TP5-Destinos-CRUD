import { CATEGORIAS } from '../../constants/destinos.js';

function Chip({ activo, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer shrink-0 ${
        activo
          ? 'bg-primary/10 border border-primary text-primary'
          : 'bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Componente "controlado": no guarda estado propio.
 * El estado (busqueda y categoria) vive en ListaPage y llega por props.
 */
export function FiltrosDestinos({
  busqueda,
  onBuscar,
  categoria,
  onCategoria,
  hayFiltros,
  onLimpiar,
}) {
  return (
    <div className="space-y-3">
      {/* Búsqueda por nombre */}
      <div className="relative flex items-center w-full">
        <label htmlFor="buscador-destinos" className="sr-only">
          Buscar destino por nombre
        </label>
        <span
          className="material-symbols-outlined absolute left-4 text-on-surface-variant/60 pointer-events-none"
          aria-hidden="true"
        >
          search
        </span>
        <input
          id="buscador-destinos"
          type="search"
          value={busqueda}
          onChange={(e) => onBuscar(e.target.value)}
          placeholder="Buscar por nombre (Iguazú, Perito Moreno...)"
          className="w-full bg-surface-container pl-12 pr-4 py-3.5 rounded-full border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-colors duration-150"
        />
      </div>

      {/* Filtro por categoría */}
      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="w-full flex gap-2 overflow-x-auto py-1"
      >
        <Chip activo={categoria === ''} onClick={() => onCategoria('')}>
          Todas
        </Chip>
        {CATEGORIAS.map((nombre) => (
          <Chip
            key={nombre}
            activo={categoria === nombre}
            onClick={() => onCategoria(nombre)}
          >
            {nombre}
          </Chip>
        ))}
      </div>

      {hayFiltros && (
        <button
          type="button"
          onClick={onLimpiar}
          className="cursor-pointer text-sm font-semibold text-primary hover:underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

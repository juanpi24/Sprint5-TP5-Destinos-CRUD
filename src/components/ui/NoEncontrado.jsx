import { Link } from 'react-router-dom';

// Se usa para la ruta 404 y cuando un :id no existe en la lista
export function NoEncontrado({ titulo, mensaje }) {
  return (
    <section className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-2xl p-8 bg-surface-container/40 text-center my-4">
      <div className="text-4xl mb-3" aria-hidden="true">🧭</div>
      <h1 className="font-syne text-xl font-bold text-on-surface mb-1">{titulo}</h1>
      <p className="text-sm text-on-surface-variant max-w-xs">{mensaje}</p>
      <Link
        to="/destinos"
        className="mt-4 px-4 py-1.5 rounded-full bg-primary text-on-primary text-sm font-semibold hover:opacity-90"
      >
        Volver a destinos
      </Link>
    </section>
  );
}

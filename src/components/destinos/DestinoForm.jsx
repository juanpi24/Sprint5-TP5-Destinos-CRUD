import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { destinoSchema } from '../../schemas/destinoSchema.js';
import { CATEGORIAS } from '../../constants/destinos.js';

// Valores con los que arranca el formulario de alta
const VALORES_VACIOS = {
  titulo: '',
  ubicacion: '',
  categoria: '',
  rating: '',
  precio: '',
  stock: '',
  destacado: false,
  imagen: '',
};

const claseInput =
  'w-full rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary';

// Etiqueta + campo + mensaje de error
function Campo({ id, etiqueta, error, children }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-on-surface">
        {etiqueta}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-error">
          {error.message}
        </p>
      )}
    </div>
  );
}

/**
 * Formulario reutilizable para crear y editar.
 * - valoresIniciales: el destino a editar (en el alta no se pasa).
 * - onSubmit: función async que recibe los datos YA validados.
 */
export function DestinoForm({ valoresIniciales, onSubmit, textoBoton }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(destinoSchema),
    defaultValues: VALORES_VACIOS,
  });

  // defaultValues solo se lee al montar. Si los datos del destino llegan (o cambian)
  // después, el formulario no se entera solo: hay que cargarlos con reset().
  // Sin esto, en la edición los campos quedarían vacíos.
  useEffect(() => {
    if (valoresIniciales) reset(valoresIniciales);
  }, [valoresIniciales, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Campo id="titulo" etiqueta="Título" error={errors.titulo}>
        <input id="titulo" type="text" className={claseInput} {...register('titulo')} />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="ubicacion" etiqueta="Ubicación" error={errors.ubicacion}>
          <input id="ubicacion" type="text" className={claseInput} {...register('ubicacion')} />
        </Campo>

        <Campo id="categoria" etiqueta="Categoría" error={errors.categoria}>
          <select id="categoria" className={claseInput} {...register('categoria')}>
            <option value="">Elegí una categoría</option>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Campo id="rating" etiqueta="Calificación (0 a 5)" error={errors.rating}>
          <input
            id="rating"
            type="number"
            step="0.1"
            className={claseInput}
            {...register('rating', { valueAsNumber: true })}
          />
        </Campo>

        <Campo id="precio" etiqueta="Precio (ARS)" error={errors.precio}>
          <input
            id="precio"
            type="number"
            className={claseInput}
            {...register('precio', { valueAsNumber: true })}
          />
        </Campo>

        <Campo id="stock" etiqueta="Stock" error={errors.stock}>
          <input
            id="stock"
            type="number"
            className={claseInput}
            {...register('stock', { valueAsNumber: true })}
          />
        </Campo>
      </div>

      <Campo id="imagen" etiqueta="URL de la imagen" error={errors.imagen}>
        <input
          id="imagen"
          type="url"
          placeholder="https://..."
          className={claseInput}
          {...register('imagen')}
        />
      </Campo>

      <label className="flex items-center gap-2 text-sm text-on-surface">
        <input type="checkbox" className="h-4 w-4 accent-primary" {...register('destacado')} />
        Destacado
      </label>

      <div className="flex flex-wrap justify-end gap-3 pt-2">
        <Link
          to="/destinos"
          className="rounded-full border border-outline-variant/40 bg-surface-container-high px-5 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-highest"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-semibold text-on-primary hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Guardando...' : textoBoton}
        </button>
      </div>
    </form>
  );
}

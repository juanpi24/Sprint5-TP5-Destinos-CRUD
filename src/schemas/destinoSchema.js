import { z } from 'zod';
import { CATEGORIAS } from '../constants/destinos.js';

// Reglas de validación del formulario, en un solo lugar.
// Si mañana se agrega un campo al recurso, se agrega acá, en el formulario y en la card.
export const destinoSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .regex(
      /^[\p{L}\p{N}\s.,()/-]+$/u,
      'El título contiene caracteres no permitidos',
    )
    .max(80, 'El título no puede superar los 80 caracteres'),
  ubicacion: z
    .string()
    .trim()
    .min(2, 'Ingresá la ubicación (provincia o localidad)'),
  categoria: z.enum(CATEGORIAS, { error: 'Elegí una categoría' }),
  rating: z
    .number({ error: 'Ingresá una calificación' })
    .min(0, 'La calificación mínima es 0')
    .max(5, 'La calificación máxima es 5'),
  precio: z
    .number({ error: 'Ingresá un precio' })
    .int('El precio debe ser un número entero')
    .min(1, 'El precio debe ser mayor a 0'),
  stock: z
    .number({ error: 'Ingresá el stock' })
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  destacado: z.boolean(),
  imagen: z.url('Ingresá una URL válida (empieza con https://)'),
});

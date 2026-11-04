const formateadorPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

// 145000 -> "$ 145.000"
export function formatearPrecio(valor) {
  return formateadorPesos.format(valor);
}

// "Iguazú" -> "iguazu": minúsculas y sin tildes,
// para que la búsqueda no distinga mayúsculas ni acentos ("iguazu" encuentra "Iguazú").
export function normalizarTexto(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

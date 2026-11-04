export function MensajeError({ mensaje, onReintentar }) {
  return (
    <p
      role="alert"
      className="rounded-lg bg-error-container p-4 text-center text-on-error-container"
    >
      {mensaje}
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          className="ml-3 underline font-semibold cursor-pointer"
        >
          Reintentar
        </button>
      )}
    </p>
  );
}

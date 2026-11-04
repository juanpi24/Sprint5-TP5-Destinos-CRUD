import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDestinosContext } from '../context/DestinosContext.jsx';
import { obtenerMensajeError } from '../api/errores.js';
import { DestinoForm } from '../components/destinos/DestinoForm.jsx';
import { Cargando } from '../components/ui/Cargando.jsx';
import { MensajeError } from '../components/ui/MensajeError.jsx';
import { NoEncontrado } from '../components/ui/NoEncontrado.jsx';

export function EditarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinos, loading, error, recargar, actualizar } = useDestinosContext();

  if (loading) return <Cargando mensaje="Cargando destino..." />;
  if (error) return <MensajeError mensaje={error} onReintentar={recargar} />;

  const destino = destinos.find((d) => d.id === id);
  if (!destino) {
    return (
      <NoEncontrado
        titulo="Este destino no existe"
        mensaje="No se puede editar un destino que no existe o que fue eliminado."
      />
    );
  }

  const onSubmit = async (datos) => {
    try {
      await actualizar(destino.id, datos);
      toast.success(`"${datos.titulo}" se actualizó correctamente`);
      navigate('/destinos');
    } catch (err) {
      toast.error(obtenerMensajeError(err));
    }
  };

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-syne text-2xl font-bold text-on-surface">Editar destino</h1>
      <DestinoForm valoresIniciales={destino} onSubmit={onSubmit} textoBoton="Guardar cambios" />
    </section>
  );
}

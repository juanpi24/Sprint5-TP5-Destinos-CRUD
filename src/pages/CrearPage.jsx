import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDestinosContext } from '../context/DestinosContext.jsx';
import { obtenerMensajeError } from '../api/errores.js';
import { DestinoForm } from '../components/destinos/DestinoForm.jsx';

export function CrearPage() {
  const navigate = useNavigate();
  const { crear } = useDestinosContext();

  // Recibe los datos ya validados por React Hook Form + Zod
  const onSubmit = async (datos) => {
    try {
      const nuevo = await crear(datos);
      toast.success(`"${nuevo.titulo}" se creó correctamente`);
      navigate('/destinos');
    } catch (err) {
      // El formulario se queda como está para que el usuario pueda reintentar
      toast.error(obtenerMensajeError(err));
    }
  };

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-syne text-2xl font-bold text-on-surface">Nuevo destino</h1>
      <DestinoForm onSubmit={onSubmit} textoBoton="Crear destino" />
    </section>
  );
}

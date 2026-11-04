import { Navigate, Route, Routes } from 'react-router-dom';
import { ListaPage } from '../pages/ListaPage.jsx';
import { DetallePage } from '../pages/DetallePage.jsx';
import { CrearPage } from '../pages/CrearPage.jsx';
import { EditarPage } from '../pages/EditarPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage.jsx';

// Todas las rutas de la aplicación en un solo lugar.
// Para agregar una pantalla nueva: se crea la página en pages/ y se suma una línea acá.
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/destinos" replace />} />
      <Route path="/destinos" element={<ListaPage />} />
      <Route path="/destinos/nuevo" element={<CrearPage />} />
      <Route path="/destinos/:id" element={<DetallePage />} />
      <Route path="/destinos/:id/editar" element={<EditarPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

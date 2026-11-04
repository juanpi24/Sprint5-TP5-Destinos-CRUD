import { NavLink } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext.jsx';

const claseLink = ({ isActive }) =>
  `px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
    isActive
      ? 'bg-primary/10 border-primary text-primary'
      : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
  }`;

export function Navbar() {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <header className="sticky top-0 z-40 bg-surface-container/90 backdrop-blur border-b border-outline-variant/30">
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo de destinos"
            className="h-9 w-9 object-contain rounded-full"
          />
          <span className="font-syne font-bold text-lg text-on-surface">
            Destinos<span className="text-primary">AR</span>
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/destinos" end className={claseLink}>
            Destinos
          </NavLink>
          <NavLink to="/destinos/nuevo" className={claseLink}>
            + Nuevo destino
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant/40 hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-on-surface text-lg"
              aria-hidden="true"
            >
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}

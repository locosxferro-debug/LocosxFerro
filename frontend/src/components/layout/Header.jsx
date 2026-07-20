import { useState } from 'react';
import LoginGoogleButton from '../auth/LoginGoogleButton.jsx';
import { logout } from '../../services/authService.js';

const links = [
  { href: '/socios', label: 'Zona Socios', private: true },
  { href: '/#quienes', label: 'Quiénes somos' },
  { href: '/#contenido', label: 'Contenido' },
  { href: '/#galeria', label: 'Galería' },
  { href: '/#sorteos', label: 'Sorteos' },
  { href: '/#sumate', label: 'Sumate' },
];

export default function Header({ user, onLogin }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogout = () => {
    logout();
    onLogin(null);
    cerrarMenu();
  };

  const nombreUsuario =
    user?.fullName || user?.username || user?.email || 'Usuario';

  const inicialUsuario = nombreUsuario.charAt(0).toUpperCase();

  const linksVisibles = links.filter(
    (link) => !link.private || user?.membershipActive
  );

  console.log('HEADER USER:', user);
  console.log('HEADER membershipActive:', user?.membershipActive);

  return (
    <header className="header">
      <nav className="nav">
        <a href="/#inicio" className="logo" onClick={cerrarMenu}>
          LOCOS <span>X</span> FERRO
        </a>

        <button
          type="button"
          className="menu-btn"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          ☰
        </button>

        <div className={`nav-links ${menuAbierto ? 'active' : ''}`}>
          <div className="nav-menu-links">
            {linksVisibles.map((link) => (
              <a key={link.href} href={link.href} onClick={cerrarMenu}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="auth-area">
            {user ? (
              <div className="user-box">
                <div className="user-avatar">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={nombreUsuario}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span>{inicialUsuario}</span>
                  )}
                </div>

                <div className="user-info">
                  <span className="user-name">{nombreUsuario}</span>

                  {user.membershipActive ? (
                    <span className="user-status socio">Socio activo</span>
                  ) : (
                    <span className="user-status no-socio">No socio</span>
                  )}
                </div>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </div>
            ) : (
              <LoginGoogleButton onLogin={onLogin} />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
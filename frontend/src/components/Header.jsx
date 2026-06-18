import { useState } from 'react';

const links = [
  { href: '#quienes', label: 'Quiénes somos' },
  { href: '#contenido', label: 'Contenido' },
  { href: '#galeria', label: 'Galería' },
  { href: '#sorteos', label: 'Sorteos' },
  { href: '#sumate', label: 'Sumate' },
];

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="header">
      <nav className="nav">
        <a href="#inicio" className="logo" onClick={cerrarMenu}>
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
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={cerrarMenu}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
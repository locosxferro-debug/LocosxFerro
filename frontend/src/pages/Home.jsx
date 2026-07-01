import Hero from '../components/sections/Hero.jsx';
import QuienesSomos from '../components/sections/QuienesSomos.jsx';
import Contenido from '../components/sections/Contenido.jsx';
import Galeria from '../components/sections/Galeria.jsx';
import Sorteos from '../components/sections/Sorteos.jsx';
import Sumate from '../components/sections/Sumate.jsx';

export default function Home({ user, onLogin }) {
  return (
    <main>
      <Hero />
      <QuienesSomos />
      <Contenido />
      <Galeria />
      <Sorteos />
      <Sumate user={user} onLogin={onLogin} />
    </main>
  );
}
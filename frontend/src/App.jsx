import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import QuienesSomos from './components/QuienesSomos.jsx';
import Contenido from './components/Contenido.jsx';
import Galeria from './components/Galeria.jsx';
import Sorteos from './components/Sorteos.jsx';
import Sumate from './components/Sumate.jsx';
import Footer from './components/Footer.jsx';


export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuienesSomos />
        <Contenido />
        <Galeria />
        <Sorteos />
        <Sumate />
      </main>
      <Footer />
    </>
  );
};
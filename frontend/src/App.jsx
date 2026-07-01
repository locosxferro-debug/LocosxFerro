import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

import Home from './pages/Home.jsx';
import Socios from './pages/Socios.jsx';
import ZonaSocios from './components/sections/ZonaSocios.jsx';

import { getCurrentUser, getMe } from './services/authService.js';

export default function App() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const actualizarUsuario = async () => {
      const userActualizado = await getMe();

      if (userActualizado) {
        const nuevoUser = userActualizado.user ?? userActualizado;

        setUser(nuevoUser);
        localStorage.setItem('user', JSON.stringify(nuevoUser));
      }
    };

    actualizarUsuario();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header user={user} onLogin={setUser} />
              <Home user={user} onLogin={setUser} />
              <Footer />
            </>
          }
        />

        <Route
          path="/socios"
          element={
            <Socios user={user} onLogin={setUser} />
          }
        />

        <Route
          path="/suscripcion/exito"
          element={
            <>
              <Header user={user} onLogin={setUser} />
              <ZonaSocios user={user} onUserUpdated={setUser} />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
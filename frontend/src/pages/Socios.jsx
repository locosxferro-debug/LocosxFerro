import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import { redirectToSubscriptionCheckout } from '../services/subscriptionService';

export default function Socios({ user, onLogin }) {

  const handleSubscribe = async () => {
  try {
      await redirectToSubscriptionCheckout(user);
    } catch (error) {
      console.error(error);
      alert(error.message || 'Error conectando con el servidor');
    }
  };

  
  if (!user) {
    return (
      <>
        <Header user={user} onLogin={onLogin} />

        <main className="min-vh-100 d-flex align-items-center bg-light">
          <section className="container py-5">
            <div className="card border-0 shadow-lg text-center p-5 mx-auto" style={{ maxWidth: '650px' }}>
              <span className="badge text-bg-secondary mb-3 align-self-center">
                Acceso restringido
              </span>

              <h1 className="fw-bold mb-3">Zona socios</h1>

              <p className="lead text-muted mb-4">
                Iniciá sesión para verificar si tenés una suscripción activa.
              </p>

              <a href="/" className="btn btn-success btn-lg">
                Volver al inicio
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  if (!user.subscriptionActive) {
    return (
      <>
        <Header user={user} onLogin={onLogin} />

        <main className="min-vh-100 d-flex align-items-center bg-light">
          <section className="container py-5">
            <div className="card border-0 shadow-lg text-center p-5 mx-auto" style={{ maxWidth: '700px' }}>
              <span className="badge text-bg-warning mb-3 align-self-center">
                Solo socios
              </span>

              <h1 className="fw-bold mb-3">Contenido exclusivo</h1>

              <p className="lead text-muted mb-4">
                Esta sección está disponible únicamente para usuarios con suscripción activa.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/" className="btn btn-outline-secondary btn-lg">
                  Volver al inicio
                </a>

                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={handleSubscribe}
                  disabled={!user}
                >
                  Suscribirme
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  const beneficios = [
    {
      titulo: 'Descuentos en viajes',
      descripcion: 'Promociones mock para micros, combis y traslados a partidos importantes.',
      icono: '🚌',
      etiqueta: 'Viajes',
    },
    {
      titulo: 'Sorteos exclusivos',
      descripcion: 'Participación ficticia en sorteos de camisetas, entradas y merchandising.',
      icono: '🎟️',
      etiqueta: 'Sorteos',
    },
    {
      titulo: 'Promos en comercios',
      descripcion: 'Beneficios mock en bares, parrillas y locales amigos de la comunidad.',
      icono: '🍻',
      etiqueta: 'Promos',
    },
    {
      titulo: 'Contenido anticipado',
      descripcion: 'Acceso prioritario a fotos, previas, crónicas y material especial.',
      icono: '📸',
      etiqueta: 'Contenido',
    },
  ];

  return (
    <>
      <Header user={user} onLogin={onLogin} />

      <main className="bg-dark text-white">
        <section className="py-5 border-bottom border-success">
          <div className="container py-5 text-center">
            <span className="badge text-bg-success px-3 py-2 mb-3">
              Suscripción activa
            </span>

            <h1 className="display-4 fw-bold mb-3">
              Zona socios
            </h1>

            <p className="lead text-white-50 mx-auto" style={{ maxWidth: '760px' }}>
              Beneficios, promociones y accesos especiales para quienes bancan Locos x Ferro mes a mes.
            </p>
          </div>
        </section>

        <section className="py-5 bg-light text-dark">
          <div className="container py-4">
            <div className="row g-4">
              {beneficios.map((beneficio) => (
                <div className="col-12 col-md-6 col-lg-3" key={beneficio.titulo}>
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div
                        className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center mb-3"
                        style={{ width: '60px', height: '60px', fontSize: '2rem' }}
                      >
                        {beneficio.icono}
                      </div>

                      <span className="badge text-bg-dark mb-2">
                        {beneficio.etiqueta}
                      </span>

                      <h5 className="fw-bold">
                        {beneficio.titulo}
                      </h5>

                      <p className="text-muted">
                        {beneficio.descripcion}
                      </p>
                    </div>

                    <div className="card-footer bg-white border-0 px-4 pb-4">
                      <button className="btn btn-outline-success w-100" disabled>
                        Próximamente
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card border-0 shadow-sm mt-5">
              <div className="card-body p-4 p-md-5">
                <div className="row align-items-center g-4">
                  <div className="col-md-8">
                    <h2 className="fw-bold mb-2">
                      Gracias por ser socio
                    </h2>

                    <p className="text-muted mb-0">
                      Esta página es un mock inicial. Más adelante podés conectar promociones reales, sorteos activos, códigos de descuento o contenido privado.
                    </p>
                  </div>

                  <div className="col-md-4 text-md-end">
                    <a href="/" className="btn btn-success btn-lg">
                      Volver al inicio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}



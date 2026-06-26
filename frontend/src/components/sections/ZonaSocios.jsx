export default function Socios({ user }) {
  
  const beneficios = [
    {
      titulo: 'Descuentos en viajes',
      descripcion:
        'Acceso anticipado a promociones para micros, combis y traslados a partidos importantes.',
      badge: 'Mock',
      icono: '🚌',
    },
    {
      titulo: 'Sorteos exclusivos',
      descripcion:
        'Participación automática en sorteos mensuales de camisetas, entradas y merchandising.',
      badge: 'Socios',
      icono: '🎟️',
    },
    {
      titulo: 'Promos en comercios',
      descripcion:
        'Beneficios ficticios en bares, parrillas y locales amigos de la comunidad ferroviaria.',
      badge: 'Promo',
      icono: '🍻',
    },
    {
      titulo: 'Contenido anticipado',
      descripcion:
        'Acceso prioritario a fotos, previas, crónicas y material especial de Locos x Ferro.',
      badge: 'Premium',
      icono: '📸',
    },
  ];

  return (
    <section id="socios" className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <span className="badge text-bg-success mb-3 px-3 py-2">
              Zona socios
            </span>

            <h2 className="display-6 fw-bold">
              Beneficios exclusivos para socios
            </h2>

            <p className="lead text-muted">
              Gracias por bancar el proyecto. Acá vas a encontrar beneficios,
              promociones y accesos especiales para miembros con suscripción
              activa.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {beneficios.map((beneficio) => (
            <div className="col-12 col-md-6 col-lg-3" key={beneficio.titulo}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '56px', height: '56px', fontSize: '1.8rem' }}
                  >
                    {beneficio.icono}
                  </div>

                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h5 className="card-title fw-bold mb-0">
                      {beneficio.titulo}
                    </h5>

                    <span className="badge text-bg-dark">
                      {beneficio.badge}
                    </span>
                  </div>

                  <p className="card-text text-muted">
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

        <div className="alert alert-success mt-5 mb-0 text-center shadow-sm">
          <strong>Suscripción activa.</strong> Esta sección es visible solo para
          socios.
        </div>
      </div>
    </section>
  );
}
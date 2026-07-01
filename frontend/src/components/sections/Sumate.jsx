import { Container, Row, Col } from 'react-bootstrap';
import LoginGoogleButton from '../auth/LoginGoogleButton.jsx';
import { redirectToSubscriptionCheckout } from '../../services/subscriptionService';

export default function Sumate({ user, onLogin }) {
  const estaSuscripto = user?.subscriptionActive === true;

  const handleSubscribe = async () => {
    if (!user || estaSuscripto) return;

    try {
      await redirectToSubscriptionCheckout(user);
    } catch (error) {
      console.error(error);
      alert(error.message || 'Error conectando con el servidor');
    }
  };

  return (
    <section id="sumate" className="py-5">
      <div className="container text-center">
        <h2 className="fw-bold">Sumate</h2>

        <p className="text-muted">
          Suscribite para acceder a beneficios exclusivos.
        </p>

        <button
          className="btn btn-success btn-lg"
          onClick={handleSubscribe}
          disabled={!user || estaSuscripto}
        >
          {estaSuscripto ? 'Ya estás suscripto' : 'Suscribirme'}
        </button>

        {!user && (
          <p className="text-muted mt-3">
            Primero tenés que iniciar sesión.
          </p>
        )}
      </div>
    </section>
  );
}
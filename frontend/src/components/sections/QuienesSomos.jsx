import { Container, Row, Col } from 'react-bootstrap';

const tarjetas = [
  {
    className: 'intro-card large',
    titulo: 'Quienes somos',
    texto: 'Este espacio es para los que están siempre: En la tribuna, en la platea o donde juegue el Verde. Porque ser de Ferro no se explica… se lleva adentro...',
    md: 6,
  },
  {
    className: 'intro-card',
    titulo: 'La pasión del hincha',
    texto: 'Historias de hinchas que llevan estos colores como parte de su vida.',
    md: 3,
  },
  {
    className: 'intro-card',
    titulo: 'Ustedes',
    texto: 'Previas, convocatorias, sorteos, entrevistas, experiencias...',
    md: 3,
  },
];

export default function QuienesSomos() {
  return (
    <section className="section intro" id="quienes">
      <Container fluid className="px-0">
        <div className="section-title">
          <p>Quiénes somos</p>
          <h2>Una comunidad hecha por hinchas</h2>
        </div>

        <Row className="g-4 intro-grid-bootstrap">
          {tarjetas.map((tarjeta) => (
            <Col key={tarjeta.titulo} md={tarjeta.md}>
              <div className={tarjeta.className}>
                <h3>{tarjeta.titulo}</h3>
                <p>{tarjeta.texto}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
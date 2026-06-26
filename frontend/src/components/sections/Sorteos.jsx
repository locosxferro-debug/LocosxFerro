import { Container, Row, Col } from 'react-bootstrap';

const sorteos = [
  {
    titulo: 'Sorteos con sponsors',
    texto: 'Premios y actividades para que la comunidad verdolaga siga creciendo.',
  },
  {
    titulo: 'Premios para hinchas',
    texto: 'Camisetas, entradas, experiencias y propuestas pensadas para la gente de Ferro.',
  },
];

export default function Sorteos() {
  return (
    <section className="section" id="sorteos">
      <Container fluid className="px-0">
        <div className="section-title">
          <p>Sorteos</p>
          <h2>Participá con la comunidad</h2>
        </div>

        <Row className="g-4">
          {sorteos.map((sorteo) => (
            <Col key={sorteo.titulo} md={6}>
              <article className="intro-card">
                <h3>{sorteo.titulo}</h3>
                <p>{sorteo.texto}</p>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
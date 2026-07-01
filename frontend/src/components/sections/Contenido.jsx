import { Container, Row, Col } from 'react-bootstrap';

const contenidos = [
  {
    titulo: 'Entrevistas con hinchas',
    texto: 'Charlas reales con gente de Ferro. La historia de cada hincha también es parte del club.',
  },
  {
    titulo: 'Fotos y videos',
    texto: 'Material de partidos, viajes, recibimientos, previas y momentos únicos de nuestro club.',
  },
  {
    titulo: 'Sorteos y premios',
    texto: 'Actividades con sponsors, regalos para la gente y propuestas para seguir creciendo.',
  },
  {
    titulo: 'Convocatorias',
    texto: 'Llamados para copar la cancha y alentar en todos las disciplinas en donde juegue nuestro amado club.',
  },
];

export default function Contenido() {
  return (
    <section className="section dark" id="contenido">
      <Container fluid className="px-0 contenido-container">
        <div className="section-title light">
          <p>Qué hacemos</p>
          <h2>Contenido verdolaga</h2>
        </div>

        <Row className="g-4">
          {contenidos.map((item) => (
            <Col key={item.titulo} md={6} lg={3}>
              <article className="card contenido-card">
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
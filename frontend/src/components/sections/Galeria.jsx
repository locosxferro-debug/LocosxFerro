import { Container, Row, Col } from 'react-bootstrap';

const fotos = [
  { clase: 'foto-partido', texto: 'FOTOS DE PARTIDO' },
  { clase: 'foto-previa', texto: 'PREVIAS' },
  { clase: 'foto-viajes', texto: 'VIAJES' },
  { clase: 'foto-hinchas', texto: 'HINCHAS' },
];

export default function Galeria() {
  return (
    <section className="section" id="galeria">
      <Container fluid className="px-0">
        <div className="section-title">
          <p>Galería</p>
          <h2>La fiesta está en la gente</h2>
        </div>

        <Row className="g-4">
          {fotos.map((foto) => (
            <Col key={foto.clase} md={6} lg={3}>
              <div className={`photo ${foto.clase}`}>
                <span>{foto.texto}</span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
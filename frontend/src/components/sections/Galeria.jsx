import { Container, Row, Col } from 'react-bootstrap';

const fotos = [
const fotos = [
  {
    clase: 'foto-partido',
    texto: 'FOTOS DE PARTIDO',
    link: 'https://drive.google.com/drive/folders/LINK_PARTIDOS'
  },
  {
    clase: 'foto-previa',
    texto: 'PREVIAS',
    link: 'https://drive.google.com/drive/folders/LINK_PREVIAS'
  },
  {
    clase: 'foto-viajes',
    texto: 'VIAJES',
    link: 'https://drive.google.com/drive/folders/LINK_VIAJES'
  },
  {
    clase: 'foto-hinchas',
    texto: 'HINCHAS',
    link: 'https://drive.google.com/drive/u/1/folders/1JS1jnLaz3u9VPzHD18OAbCUTPXHQn6np/LINK_HINCHAS'
  },
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

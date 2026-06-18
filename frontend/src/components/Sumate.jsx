import { Container, Row, Col } from 'react-bootstrap';

export default function Sorteos() {
  return (
    <section id="sorteos" className="banner-full">
      <Container fluid className="px-0">
        <div className="banner-bg">
          <Container>
            <Row className="align-items-center g-4">
              <Col xs={12} lg={8}>
                <p className="tag green">Historias Verdolagas</p>

                <h2>¿Querés ser el próximo entrevistado/a?</h2>

                <p>
                  En Locos x Ferro contamos historias de hinchas. Queremos conocer
                  cómo nació tu pasión por el Verde, tus viajes, tus anécdotas y
                  todo lo que significa Ferro para vos.
                </p>
              </Col>

              <Col xs={12} lg={4} className="text-lg-end">
                <a
                  href="https://www.instagram.com/locosxferro.ok/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary"
                >
                  Contar mi historia
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </section>
  );
}
import Navbar from "../Components/Navbar";
import { Card, Container, Row, Col } from 'react-bootstrap';
import "../Recipes/Recipes.css";

function Recipes() {
    return (
        <div>
            <Navbar />
            <Container>
                <Row>
                    <Col xs={12} md={4} className="container_izquierdo">
                        <Card>
                            <Card.Title>Ingredientes</Card.Title>
                            <Card.Body>
                                Contenido del contenedor izquierdo
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="container_centro">
                        <Card>
                            <Card.Title>Paso a paso</Card.Title>
                            <Card.Body>
                                Contenido del contenedor central
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4} className="container_derecho">
                        <Card>
                            <Card.Title>Información nutricional</Card.Title>
                            <Card.Body>
                                Contenido del contenedor derecho
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Recipes;

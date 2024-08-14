'use client'
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function GridCard() {
    return (
        <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
                <Col key={idx}>
                    <Card>
                        <Row>
                            <Col>
                                <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.xZ4VQKpf4Tb6fMaCG7ettQAAAA?rs=1&pid=ImgDetMain" />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href="#">Card Link</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body></Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default GridCard;
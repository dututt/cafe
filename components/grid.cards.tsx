'use client'
import { Form, ListGroup } from 'react-bootstrap';
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
                                    <Card.Title>Tên món</Card.Title>
                                    <Card.Text>
                                        Thông tin chi tiết của món.
                                    </Card.Text>
                                </Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Chọn món" />
                                    </Form.Group>
                                </Form>
                                {/* <Card.Body>
                                    <Card.Link href="#">Card Link</Card.Link>
                                </Card.Body> */}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default GridCard;
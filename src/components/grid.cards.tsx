'use client'
import { Form, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function GridCard(props: IProps) {
    const { catalogs } = props;

    return (
        <Row xs={1} md={2} className="g-4">
            {Array.from({ length: catalogs?.length }).map((_, idx) => (
                <Col key={idx}>
                    <Card>
                        <Row>
                            <Col>
                                <Card.Img variant="top" src={catalogs[idx].image} />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>{catalogs[idx].title}</Card.Title>
                                    <Card.Text>
                                        {catalogs[idx].content}
                                    </Card.Text>
                                </Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId={"formBasicCheckbox" + catalogs[idx].id + catalogs[idx].type}>
                                        <Form.Check type="checkbox" label="Chọn món" />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default GridCard;
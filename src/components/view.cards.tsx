'use client'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';

interface IProps {
    showViewCard: boolean
    setShowViewCard: (value: boolean) => void
    viewSelects: ISelections
}

function ViewCard(props: IProps) {
    const { showViewCard, setShowViewCard, viewSelects } = props

    return (
        <>
            <Modal size="lg" centered
                show={showViewCard}
                onHide={() => setShowViewCard(false)}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo thực đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: viewSelects?.selections?.length }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{ height: '10rem' }}>
                                    <Row>
                                        <Col>
                                            <Card.Img variant="top" src={viewSelects?.selections?.[idx].item.image} />
                                        </Col>
                                        <Col>
                                            <Card.Body>
                                                <Card.Title>{viewSelects?.selections?.[idx].item.title}</Card.Title>
                                                <Card.Text>
                                                    {viewSelects?.selections?.[idx].item.content}
                                                </Card.Text>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewCard(false)}>Đồng ý</Button>
                </Modal.Footer>
            </Modal>
            {/* <br />
            <div>
                <h1>Take a Photo </h1>
                <WebcamCapture />
            </div>

            <br /> */}
        </>
    );
}

export default ViewCard;
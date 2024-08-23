'use client'
import { Button, ButtonGroup, Card, Col, Modal, Row } from 'react-bootstrap';

interface IProps {
    showViewCard: boolean
    setShowViewCard: (value: boolean) => void
    viewSelects: ISelections
    setViewSelects: (value: ISelections) => void
}

function ViewCard(props: IProps) {
    const { showViewCard, setShowViewCard, viewSelects, setViewSelects } = props

    function handleAcceptView(): void {
        viewSelects.selections.filter(ck => ck.selected === true).map(ck => {
            ck.selected = false
        })
        viewSelects.selections = []
        setViewSelects(viewSelects)
        setShowViewCard(false);
    }

    const increment = (value: ISelection) => {
        value.amount += 1
        viewSelects.selections.map(item => {
            if (item.item.id === value.item.id) {
                item.amount = value?.amount
                updateCount(item)
                return
            }
        })
    }
    const decrement = (value: ISelection) => {
        if (value.amount <= 1) {
            return
        }
        value.amount -= 1
        viewSelects.selections.map(item => {
            if (item.item.id === value.item.id) {
                item.amount = value?.amount
                updateCount(item)
                return
            }
        })
    }

    function updateCount(item: ISelection): import("react").ReactNode {
        return item.amount
    }

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
                                            </Card.Body>
                                            <Card.Footer>
                                                <ButtonGroup size="sm">
                                                    <Button variant="outline-success">{updateCount(viewSelects?.selections?.[idx])}</Button>
                                                    <Button variant="outline-info" onClick={() => increment(viewSelects?.selections?.[idx])}>Tăng</Button>
                                                    <Button variant="outline-danger" onClick={() => decrement(viewSelects?.selections?.[idx])}>Giảm</Button>
                                                </ButtonGroup>
                                            </Card.Footer>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleAcceptView()}>Đồng ý</Button>
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
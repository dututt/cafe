'use client'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import OrderStatus from './order.status';
import { useState } from 'react';
import Count from './count';
import { usePathname, useSearchParams } from 'next/navigation';

interface IProps {
    showViewCard: boolean
    setShowViewCard: (value: boolean) => void
    orderTable: IOrderTable | undefined
}

function ViewCardDetail(props: IProps) {
    const { showViewCard, setShowViewCard, orderTable } = props

    const [status, setStatus] = useState<boolean>(false)

    function handleClose() {
        setShowViewCard(false)
    }

    return (
        <>
            <Modal size="lg" centered
                show={showViewCard}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Đặt món - Bàn {orderTable && orderTable.orderTableNumber}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row xs={1} md={2} className="g-4">
                        {orderTable && Array.from({ length: orderTable.items.selections.length }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{ height: '10rem' }}>
                                    <Row>
                                        <Col>
                                            <Card.Img variant="top" className="card-img-top fixed-size-m" src={orderTable.items.selections[idx].item.image} />
                                        </Col>
                                        <Col>
                                            <Card.Body>
                                                <Card.Title>{orderTable.items.selections[idx].item.title}</Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Count selection={orderTable.items.selections[idx]} status={status} />
                                            </Card.Footer>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <OrderStatus status={status} />
                    {/* <Button variant="secondary" disabled={!(viewSelects?.selections?.length > 0) || status} onClick={() => handleAcceptView()}>Đồng ý</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewCardDetail;
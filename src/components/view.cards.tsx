'use client'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import OrderStatus from './order.status';
import { useState } from 'react';
import Count from './count';
import { usePathname, useSearchParams } from 'next/navigation';

interface IProps {
    showViewCard: boolean
    setShowViewCard: (value: boolean) => void
    viewSelects: ISelections
    setViewSelects: (value: ISelections) => void
    acceptStatus: boolean
    setAcceptStatus: (value: boolean) => void
    useCustom: {
        orderTables: IOrderTables
    }
}

function ViewCard(props: IProps) {
    const { showViewCard, setShowViewCard, viewSelects, setViewSelects, acceptStatus, setAcceptStatus, useCustom } = props

    const [orderTableNumber, setOrderTableNumber] = useState<number>(0)
    const [orderTable, setOrderTable] = useState<IOrderTable>()
    const [status, setStatus] = useState<boolean>(false)
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    const fullUrl = `${window.location.origin}${pathname}${searchParams && searchParams.toString() ? '?' + searchParams.toString() : ''}${hash}`;

    function handleAcceptView(): void {
        setStatus(true)
        setAcceptStatus(acceptStatus === true)
        useCustom?.orderTables.items.push(initOrderTable())
        console.log(">>>>>>>>>>state: ", useCustom?.orderTables.items)
    }

    function initOrderTable(): IOrderTable {
        const orderTable: IOrderTable = { orderTableNumber: Number.parseInt(fullUrl.split("#")[1]), items: viewSelects, status: status }
        return orderTable
    }

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
                    <Modal.Title>Đặt món - Bàn {Number.parseInt(fullUrl.split("#")[1])}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: viewSelects?.selections?.length }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{ height: '10rem' }}>
                                    <Row>
                                        <Col>
                                            <Card.Img variant="top" className="card-img-top fixed-size-m" src={viewSelects?.selections?.[idx].item.image} />
                                        </Col>
                                        <Col>
                                            <Card.Body>
                                                <Card.Title>{viewSelects?.selections?.[idx].item.title}</Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Count selection={viewSelects?.selections?.[idx]} status={status} />
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
                    <Button variant="secondary" disabled={!(viewSelects?.selections?.length > 0) || status} onClick={() => handleAcceptView()}>Đồng ý</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewCard;
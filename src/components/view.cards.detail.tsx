'use client'
import { Card, Col, Modal, Row } from 'react-bootstrap';
import useSWR from 'swr';

interface IProps {
    showViewCard: boolean
    setShowViewCard: (value: boolean) => void
    orderTable: IOrderTable
}

function ViewCardDetail(props: IProps) {
    const { showViewCard, setShowViewCard, orderTable } = props

    const id = orderTable ? orderTable.id : 0

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(
        `/api/order-items?id=${id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (!data) {
        return <div>Order items loading...</div>
    }

    if (!showViewCard) {
        return <></>
    }
    const order_items: IOrderItem[] = data
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
                    <Modal.Title>Đặt món - Bàn {orderTable?.table_num}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row xs={1} md={2} className="g-0">
                        {Array.from({ length: order_items.length }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{ height: '7rem' }}>
                                    <Row>
                                        <Col>
                                            <Card.Img variant="top" style={{ height: '6rem' }} className="card-img-top fixed-size-m" src={order_items[idx].image} />
                                        </Col>
                                        <Col>
                                            <Card.Body className="m-0 p-1">
                                                <Card.Title>{order_items[idx].title}</Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                {order_items[idx].item_num} Phần
                                            </Card.Footer>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ViewCardDetail;
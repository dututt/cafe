'use client'
import { Card, Col, Modal, Row } from 'react-bootstrap';
import useSWR from 'swr';

interface IProps {
    showViewCard: boolean
    setShowViewCard: (value: boolean) => void
    orderTable: IOrderTable | undefined
}

function ViewCardDetail(props: IProps) {
    const { showViewCard, setShowViewCard, orderTable } = props

    if (!showViewCard) {
        return <></>
    }

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(
        "/api/order-items",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    const order_id = orderTable?.id
    if (!order_id) return <></>;

    if (!data) {
        return <div>Order items loading...</div>
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
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: order_items.length }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{ height: '10rem' }}>
                                    <Row>
                                        <Col>
                                            <Card.Img variant="top" className="card-img-top fixed-size-m" src={order_items[idx].image} />
                                        </Col>
                                        <Col>
                                            <Card.Body>
                                                <Card.Title>{order_items[idx].title}</Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                {/* <Count selection={orderTable.items.selections[idx]} status={true} /> */}
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
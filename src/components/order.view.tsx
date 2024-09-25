import { Badge, Button, ButtonGroup, Card, CloseButton, Col, Row } from "react-bootstrap";
import OrderStatus from "./order.status";
import Count from "./count";
import CurrencyDisplay from "@/app/utils/currency.display";

interface IProps {
    selects: ISelection[]
    status: boolean
    TotalBill: () => void
    deSelect: (value: ISelection) => void
    changeTextStatus: string
    total: number
    handleAcceptView: () => void
}

function OrderView(props: IProps) {
    const { selects, status, TotalBill, deSelect, changeTextStatus, total, handleAcceptView } = props

    return (
        <>
            <Card className="text-center">
                <Card.Header>Danh sách món đã chọn</Card.Header>
                <Card.Body>
                    <Row xs={1} md={2} className="g-0">
                        {Array.from({ length: selects?.length }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{ height: '9rem' }}>
                                    <Row>
                                        <Col xs={6} md={0}>
                                            <Card.Img variant="top" style={{ height: '8rem' }} className="card-img-top fixed-size-m p-1" src={selects[idx].item?.image} />
                                        </Col>
                                        <Col>
                                            <Card.Body className="m-0 p-1">
                                                <Card.Title className="d-flex justify-content-between align-items-start">
                                                    {selects[idx].item?.title}
                                                    <CloseButton onClick={() => deSelect(selects[idx])} />
                                                </Card.Title>
                                                <Card.Text><CurrencyDisplay amount={selects[idx].item?.price_order} /></Card.Text>
                                                <Count selects={selects} selection={selects[idx]} status={status} refreshPrice={TotalBill} />
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <ButtonGroup size="sm">
                        <OrderStatus status={status} changeTextStatus={changeTextStatus} />
                        <Button variant="outline-warning">Tổng Giá</Button>
                        <Button variant="outline-danger"><CurrencyDisplay amount={selects.length > 0 ? total : 0} /></Button>
                        <Button variant="secondary" disabled={!(selects.length > 0) || status} onClick={() => handleAcceptView()}>Đồng ý</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
        </>
    );

}
export default OrderView;
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
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
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: selects?.length }).map((_, idx) => (
                            <Col key={idx}>
                                <Card>
                                    <Row>
                                        <Col xs={6} md={4}>
                                            <Card.Img variant="top" className="card-img-top fixed-size-m" src={selects[idx].item?.image} />
                                        </Col>
                                        <Col>
                                            <Card.Body>
                                                <Card.Title>{selects[idx].item?.title}</Card.Title>
                                                <Card.Text><CurrencyDisplay amount={selects[idx].item?.price_order} /></Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Count selects={selects} selection={selects[idx]} status={status} refreshPrice={TotalBill} deSelect={deSelect} />
                                            </Card.Footer>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <OrderStatus status={status} changeTextStatus={changeTextStatus} />
                    <ButtonGroup size="sm">
                        <Button variant="outline-warning">Tổng Giá</Button>
                        <Button variant="outline-info"><CurrencyDisplay amount={selects.length > 0 ? total : 0} /></Button>
                    </ButtonGroup>{' '}
                    <Button variant="secondary" disabled={!(selects.length > 0) || status} onClick={() => handleAcceptView()}>Đồng ý</Button>
                </Card.Footer>
            </Card>
        </>
    );

}
export default OrderView;
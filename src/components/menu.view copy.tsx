import CurrencyDisplay from "@/app/utils/currency.display";
import { Badge, Button, ButtonGroup, Card, Col, Form, Row } from "react-bootstrap";
import Count from "./count";
import Count1 from "./count copy";

interface IProps {
    iSelects: ISelection[]
    valueCheck: (value: ISelection) => number
    handleCheck: (ck: boolean, cat: ISelection) => void
}
const selection: ISelection = { item: { id: 0, content: '', title: '', type: 1, image: '', price: 0, price_order: 0 }, amount: 0, selected: false }

function MenuView1(props: IProps) {
    const { iSelects, valueCheck, handleCheck } = props

    function deSelect(value: ISelection): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <Row xs={1} md={2} className="g-4">
                {Array.from({ length: iSelects?.length }).map((_, idx) => (
                    <Col key={idx}>
                        <Card style={{ height: '11rem' }}>
                            <Row>
                                <Col>
                                    <Card.Img variant="top" style={{ height: '10rem' }} className="card-img-top fixed-size" src={iSelects[idx].item.image} />
                                </Col>
                                <Col>
                                    <Card.Body >
                                        <Card.Title className="d-flex justify-content-between align-items-start" >

                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{iSelects[idx].item.title}</div>
                                            </div>
                                        </Card.Title>

                                        <Card.Text>
                                            <ButtonGroup size="sm">
                                                <Button variant="outline-warning">Giá</Button>
                                                <Button variant="outline-danger"><CurrencyDisplay amount={iSelects[idx].item.price} /></Button>
                                            </ButtonGroup>
                                        </Card.Text>

                                        <Count1 selects={[]} selection={selection} refreshPrice={() => { }} deSelect={deSelect} status />

                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )

}
export default MenuView1;
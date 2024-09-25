import CurrencyDisplay from "@/app/utils/currency.display";
import { Button, ButtonGroup, Card, CloseButton, Col, Form, Row } from "react-bootstrap";

interface IProps {
    iSelects: ISelections
    valueCheck: (value: ISelection) => number
    handleCheck: (ck: boolean, cat: ISelection) => void
}

function MenuView(props: IProps) {
    const { iSelects, valueCheck, handleCheck } = props

    return (
        <>
            <Row xs={1} md={2} className="g-0">
                {Array.from({ length: iSelects?.selections?.length }).map((_, idx) => (
                    <Col key={idx}>
                        <Card style={{ height: '9rem' }}>
                            <Row>
                                <Col>
                                    <Card.Img variant="top" style={{ height: '8rem' }} className="card-img-top fixed-size p-1" src={iSelects?.selections[idx].item.image} />
                                </Col>
                                <Col>
                                    <Card.Body className="m-0 p-1">
                                        <Card.Title>
                                            {iSelects?.selections[idx].item.title}
                                        </Card.Title>
                                        <Card.Text>
                                            <ButtonGroup size="sm">
                                                <Button variant="outline-warning">Giá</Button>
                                                <Button variant="outline-danger"><CurrencyDisplay amount={iSelects?.selections[idx].item.price} /></Button>
                                            </ButtonGroup>
                                        </Card.Text>
                                        <Form>
                                            <Form.Group className="mb-3" controlId={"formBasicCheckbox" + iSelects?.selections[idx].item.id}>
                                                {<Form.Check type="checkbox"
                                                    label="Chọn món" value={0} checked={iSelects?.selections[idx].selected}
                                                    onChange={(e) => handleCheck(e.currentTarget.checked, iSelects?.selections[idx])} />}
                                            </Form.Group>
                                        </Form>
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
export default MenuView;
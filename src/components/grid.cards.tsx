'use client'
import { useEffect, useLayoutEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface IProps {
    catalogs: ICatalog[];
    selects: ISelections
    setSelects: (value: ISelections) => void
}


function GridCard(props: IProps) {
    const { catalogs, selects, setSelects } = props

    const [checked, setChecked] = useState(0);

    const handleCheck = (ck: boolean, cat: ICatalog) => {

        setChecked(1)
        const select: ISelection = { item: cat, selected: ck, amount: 1 }

        if (ck) {
            selects?.selections.push(select)
        } else {
            const newSelects = selects?.selections.filter(sel => !(sel.item.id === cat.id && sel.selected === true))
            selects.selections = [...newSelects]
        }
        setSelects(selects)
        console.log(">>>>>handleCheck for data: ", selects)
    }

    function handleAcceptStatus() {
        console.log(">>>>>1111handleAcceptStatus data: ", selects)
    }

    return (
        <Row xs={1} md={2} className="g-4">
            {Array.from({ length: catalogs?.length }).map((_, idx) => (
                <Col key={idx}>
                    <Card style={{ height: '14rem' }}>
                        <Row>
                            <Col>
                                <Card.Img variant="top" className="card-img-top fixed-size" src={catalogs?.[idx].image} />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>{catalogs?.[idx].title}</Card.Title>
                                    <Card.Text>
                                        {catalogs?.[idx].content}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Form>
                                        <Form.Group className="mb-3" controlId={"formBasicCheckbox" + catalogs?.[idx].id}>
                                            {<Form.Check type="checkbox"
                                                label="Chọn món" value={checked}
                                                onChange={(e) => handleCheck(e.currentTarget.checked, catalogs?.[idx])} />}
                                        </Form.Group>
                                    </Form>
                                </Card.Footer>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default GridCard;
'use client'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface IProps {
    catalogs: ICatalog[];
    selects: ISelections
}


function GridCard(props: IProps) {
    const { catalogs, selects } = props

    const [checked, setChecked] = useState(false);

    const handleCheck = (ck: boolean, cat: ICatalog) => {

        setChecked(checked)
        const select: ISelection = { item: cat, selected: ck }

        if (ck) {
            selects.selections.push(select)
        } else {
            const newSelects = selects?.selections.filter(sel => !(sel.item.id === cat.id && sel.selected === true))
            selects.selections = [...newSelects]
        }
        console.log(">>>>selects: ", selects.selections)
    }

    return (
        <Row xs={1} md={2} className="g-4">
            {Array.from({ length: catalogs?.length }).map((_, idx) => (
                <Col key={idx}>
                    <Card style={{ height: '18rem' }}>
                        <Row>
                            <Col>
                                <Card.Img variant="top" src={catalogs?.[idx].image} />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>{catalogs?.[idx].title}</Card.Title>
                                    <Card.Text>
                                        {catalogs?.[idx].content}
                                    </Card.Text>
                                </Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId={"formBasicCheckbox" + catalogs?.[idx].id}>
                                        {<Form.Check type="checkbox"
                                            label="Chọn món" value={checked ? 1 : 0}
                                            onChange={(e) => handleCheck(e.currentTarget.checked, catalogs?.[idx])} />}
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default GridCard;
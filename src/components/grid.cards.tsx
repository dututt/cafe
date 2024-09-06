'use client'
import { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface IProps {
    iSelects: ISelections
    selects: ISelections
    setSelects: (value: ISelections) => void
    valueCheck: (value: ISelection) => number
}


function GridCard(props: IProps) {
    const { iSelects, selects, setSelects, valueCheck } = props

    const handleCheck = (ck: boolean, cat: ISelection) => {
        cat.selected = ck
        if (ck) {
            selects?.selections.push(cat)
        } else {
            const newSelects = selects?.selections.filter(sel => !(sel.item.id === cat.item.id))
            selects.selections = [...newSelects]
        }
        setSelects(selects)
    }

    return (
        <>
            <Row xs={1} md={2} className="g-4">
                {Array.from({ length: iSelects?.selections?.length }).map((_, idx) => (
                    <Col key={idx}>
                        <Card style={{ height: '11rem' }}>
                            <Row>
                                <Col>
                                    <Card.Img variant="top" style={{ height: '10rem' }} className="card-img-top fixed-size" src={iSelects?.selections[idx].item.image} />
                                </Col>
                                <Col>
                                    <Card.Body>
                                        <Card.Title>{iSelects?.selections[idx].item.title}</Card.Title>
                                        <Card.Text>
                                            {iSelects?.selections[idx].item.content}
                                        </Card.Text>
                                        <Card.Text>
                                            <ButtonGroup size="sm">
                                                <Button variant="outline-warning">Giá</Button>
                                                <Button variant="outline-info">{iSelects?.selections[idx].item.price}</Button>
                                                <Button variant="outline-danger">VND</Button>
                                            </ButtonGroup>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Form>
                                            <Form.Group className="mb-3" controlId={"formBasicCheckbox" + iSelects?.selections[idx].item.id}>
                                                {<Form.Check type="checkbox"
                                                    label="Chọn món" value={valueCheck(iSelects?.selections[idx])}
                                                    onChange={(e) => handleCheck(e.currentTarget.checked, iSelects?.selections[idx])} />}
                                            </Form.Group>
                                        </Form>
                                    </Card.Footer>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default GridCard;
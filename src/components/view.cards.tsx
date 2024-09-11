'use client'
import { Button, ButtonGroup, Card, Col, Modal, Row } from 'react-bootstrap';
import OrderStatus from './order.status';
import { useState } from 'react';
import Count from './count';
import { usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    showViewCard: boolean
    setShowViewCard: (value: boolean) => void
    viewSelects: ISelections
    setAcceptStatus: (value: boolean) => void
}

function ViewCard(props: IProps) {
    const { showViewCard, setShowViewCard, viewSelects, setAcceptStatus } = props

    const [status, setStatus] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)

    const [changeTextStatus, setChangeTextStatus] = useState<string>('')

    const pathname = usePathname()
    const searchParams = useSearchParams();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const fullUrl = `${window.location.origin}${pathname}${searchParams && searchParams.toString() ? '?' + searchParams.toString() : ''}${hash}`;
    let tableNum = fullUrl.split("#")[1]

    function handleChangeTextStatus() {
        setChangeTextStatus('Đang tiếp nhận...')
    }

    const selects = viewSelects.selections.filter(item => item.selected === true)
    function handleAcceptView(): void {
        setStatus(true)
        setAcceptStatus(true)
        handleChangeTextStatus()

        let numTable = !tableNum ? 0 : Number.parseInt(tableNum)

        fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numTable, total, selects })
        }).then(res => {
            console.log(">>>>>>>>>>>>>server log create order: ", res)
            return res.json()
        })
            .then(res => {
                if (res) {
                    toast.success("Create new order succeed !")
                    mutate(fullUrl.split("#")[0] + "/api/order-list")
                }
            })
    }


    function handleClose() {
        setShowViewCard(false)
    }

    function refreshPrice() {
        TotalBill()
    }

    function TotalBill() {
        let total: number = 0
        selects.map((item) => {
            total += Number.parseInt(item.item.price.toString())
        })
        setTotal(total)
    }

    return (
        <>
            <Modal size="lg" centered
                show={showViewCard}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Đặt món - Bàn {!tableNum ? 0 : Number.parseInt(tableNum)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: selects?.length }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{ height: '10rem' }}>
                                    <Row>
                                        <Col>
                                            <Card.Img variant="top" className="card-img-top fixed-size-m" src={selects[idx].item?.image} />
                                        </Col>
                                        <Col>
                                            <Card.Body>
                                                <Card.Title>{selects[idx].item?.title}</Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Count selection={selects[idx]} status={status} refreshPrice={refreshPrice} />
                                            </Card.Footer>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <OrderStatus status={status} changeTextStatus={changeTextStatus} />
                    <ButtonGroup size="sm">
                        <Button variant="outline-warning">Tổng Giá</Button>
                        <Button variant="outline-info">{selects.length > 0 ? total : 0}</Button>
                        <Button variant="outline-danger">VND</Button>
                    </ButtonGroup>
                    <Button variant="secondary" disabled={!(selects.length > 0) || status} onClick={() => handleAcceptView()}>Đồng ý</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewCard;


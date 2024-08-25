'use client'
import { useState } from "react"
import { Badge, Button, ButtonGroup, ListGroup, Modal } from "react-bootstrap"

interface IProps {
    viewSelects: ISelections
    showOrderList: boolean
    setShowOrderList: (value: boolean) => void
}

function OrderList(props: IProps) {
    const { viewSelects, showOrderList, setShowOrderList } = props
    console.log(">>>>OrderList: ", viewSelects)

    const s: IOrderTableList = { items: [] }
    const [orderTableNumber, setOrderTableNumber] = useState<number>(0)
    const [orderTableList, setOrderTableList] = useState<IOrderTableList>(s)

    const orderTable: IOrderTable = { orderTableNumber: orderTableNumber, items: viewSelects }
    orderTableList.items = [...[orderTable]]

    function handleShowOrderList() {
        console.log(">>>>OrderList: ", viewSelects)
    }

    return (
        <>
            <ListGroup as="ol" numbered hidden={!showOrderList}>
                {Array.from({ length: orderTableList?.items.length }).map((_, idx) => (
                    <ListGroup.Item key={idx}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Bàn 1</div>
                            <ButtonGroup size="sm">
                                <Button variant="outline-info">Đang tạo món</Button>
                                <Button variant="outline-danger">Xong</Button>
                            </ButtonGroup>
                        </div>
                        <Badge bg="primary" pill onClick={() => handleShowOrderList()}>
                            Số lượng ({orderTableList?.items[orderTableNumber].items.selections.length})
                        </Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default OrderList;
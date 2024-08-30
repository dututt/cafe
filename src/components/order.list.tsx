'use client'
import { useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, ListGroup, Modal } from "react-bootstrap"
import useCustomHook from "./useCustomHook"
import ViewCardDetail from "./view.cards.detail"

interface IProps {
    viewSelects: ISelections
    showOrderList: boolean
    setAcceptStatus: (value: boolean) => void
    useCustom: {
        orderTables: IOrderTables
    }
}

function OrderList(props: IProps) {
    const { viewSelects, showOrderList, setAcceptStatus, useCustom } = props
    console.log(">>>>OrderList: ", viewSelects)

    const s: IOrderTables = { items: [] }
    const [showViewCard, setShowViewCard] = useState<boolean>(false)
    const [orderTable, setOrderTable] = useState<IOrderTable>()

    const [received, setReceived] = useState<boolean>(true)
    const [created, setCreated] = useState<boolean>(true)
    const [done, setDone] = useState<boolean>(true)

    function handleReceived(): void {
        setReceived(false)
        setCreated(false)
    }

    function handleCreated(): void {
        setReceived(false)
        setCreated(true)
        setDone(false)
    }

    function handleDone(): void {
        setDone(true)
        setAcceptStatus(false)
    }


    function handleAmountOfOrderTable(orderTable: IOrderTable): import("react").ReactNode {
        let count = 0
        orderTable.items.selections.map((k) => {
            count += k.amount
        })
        return count
    }

    function handleShowOrderDetail(orderTable: IOrderTable): void {
        setShowViewCard(true)
        setOrderTable(orderTable)
    }

    return (
        <>
            <ListGroup as="ol" numbered hidden={!showOrderList}>
                {useCustom && Array.from({ length: useCustom?.orderTables.items.length }).map((_, idx) => (
                    <ListGroup.Item key={idx}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Bàn {useCustom?.orderTables.items[idx].orderTableNumber}</div>
                            <ButtonGroup size="sm">
                                <Button disabled={!received} onClick={() => handleReceived()} variant="outline-primary">Đã nhận</Button>
                                <Button disabled={created} onClick={() => handleCreated()} variant="outline-warning">Đang tạo món</Button>
                                <Button disabled={done} onClick={() => handleDone()} variant="outline-success">Xong</Button>
                            </ButtonGroup>
                        </div>
                        <Badge bg="primary" pill onClick={() => handleShowOrderDetail(useCustom?.orderTables.items[idx])}>
                            Số lượng ({handleAmountOfOrderTable(useCustom?.orderTables.items[idx])})
                        </Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>



            {useCustom && <ViewCardDetail
                showViewCard={showViewCard}
                setShowViewCard={setShowViewCard}
                orderTable={orderTable}
            />}
        </>
    );
}

export default OrderList;
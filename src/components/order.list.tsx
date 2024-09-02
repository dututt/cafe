'use client'
import { useState } from "react"
import { Badge, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import ViewCardDetail from "./view.cards.detail"
import useSWR from "swr"

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

    function handleShowOrderDetail(orderTable: IOrderTable): void {
        setShowViewCard(true)
        setOrderTable(orderTable)
    }

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(
        "/api/order-list",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    if (!data) {
        return <div>Orders loading...</div>
    }
    const orders: IOrderTable[] = data

    return (
        <>
            <ListGroup as="ol" numbered hidden={!showOrderList}>
                {orders && Array.from({ length: orders?.length }).map((_, idx) => (
                    <ListGroup.Item key={idx}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Bàn {orders[idx].table_num} - ({orders[idx].created_at.toString()})</div>
                            <ButtonGroup size="sm">
                                <Button disabled={!received} onClick={() => handleReceived()} variant="outline-primary">Đã nhận</Button>
                                <Button disabled={created} onClick={() => handleCreated()} variant="outline-warning">Đang tạo món</Button>
                                <Button disabled={done} onClick={() => handleDone()} variant="outline-success">Xong</Button>
                            </ButtonGroup>
                        </div>
                        <Badge bg="primary" pill onClick={() => handleShowOrderDetail(orders[idx])}>
                            Số lượng ({orders[idx].count_items})
                        </Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>



            <ViewCardDetail
                showViewCard={showViewCard}
                setShowViewCard={setShowViewCard}
                orderTable={orderTable}
            />
        </>
    );
}

export default OrderList;
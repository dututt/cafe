'use client'
import { useState } from "react"
import { Badge, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import ViewCardDetail from "./view.cards.detail"
import useSWR from "swr"

interface IProps {
    viewSelects: ISelections
    showOrderList: boolean
    setAcceptStatus: (value: boolean) => void
}

function OrderList(props: IProps) {
    const { viewSelects, showOrderList, setAcceptStatus } = props

    const s: IOrderTables = { items: [] }
    const [showViewCard, setShowViewCard] = useState<boolean>(false)
    const [orderTable, setOrderTable] = useState<IOrderTable>({ id: 0, count_items: 0, price: 0, status: false, table_num: 0, created_at: new Date })

    const [received, setReceived] = useState<boolean>(true)
    const [created, setCreated] = useState<boolean>(true)
    const [done, setDone] = useState<boolean>(true)
    const [trackingStatus, setTrackingStatus] = useState<ITrackingOrderTable>()

    function handleReceived(orderTable: IOrderTable): void {
        setReceived(false)
        setCreated(false)
        setTrackingStatus({ item: orderTable, status: [{ key: "Received", value: received }, { key: "Created", value: created }] })
        setTrackingStatus({ item: orderTable, status: [{ key: "Received", value: received }, { key: "Created", value: created }, { key: "Done", value: done }] })
    }

    function handleCreated(orderTable: IOrderTable): void {
        setReceived(false)
        setCreated(true)
        setDone(false)
        setTrackingStatus({ item: orderTable, status: [{ key: "Received", value: received }, { key: "Created", value: created }, { key: "Done", value: done }] })
    }

    function handleDone(orderTable: IOrderTable): void {
        setDone(true)
        setTrackingStatus({ item: orderTable, status: [{ key: "Received", value: received }, { key: "Created", value: created }, { key: "Done", value: done }] })

        setAcceptStatus(orderTable.status === false)
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
                                <Button disabled={!trackingStatus?.status[0].value} onClick={() => handleReceived(orders[idx])} variant="outline-primary">Đã nhận</Button>
                                <Button disabled={trackingStatus?.status[1].value} onClick={() => handleCreated(orders[idx])} variant="outline-warning">Đang tạo món</Button>
                                <Button disabled={trackingStatus?.status[2].value} onClick={() => handleDone(orders[idx])} variant="outline-success">Xong</Button>
                            </ButtonGroup>

                        </div>
                        <Button variant="primary" onClick={() => handleShowOrderDetail(orders[idx])}>
                            <Badge bg="secondary">{orders[idx].count_items}</Badge> Món
                            <span className="visually-hidden">unread messages</span>
                        </Button>
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
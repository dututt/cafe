'use client'
import { useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import ViewCardDetail from "./view.cards.detail"
import useSWR from "swr"
import OrderItems from "./get.order.list"
import OrderListButtons from "./order.list.buttons"

interface IProps {
    showOrderList: boolean
}

function OrderList(props: IProps) {
    const { showOrderList } = props

    const s: IOrderTables = { items: [] }
    const [showViewCard, setShowViewCard] = useState<boolean>(false)
    const [orderTable, setOrderTable] = useState<IOrderTable>({ id: 0, count_items: 0, price: 0, status: '', table_num: 0, created_at: new Date })

    const [refresh, setRefresh] = useState<boolean>(true)

    const refreshButtons = (order: IOrderTable) => {
        return <>
            <OrderListButtons order={order} handleReceived={handleReceived} handleCreated={handleCreated} handleDone={handleDone} />
        </>
    }

    useEffect(() => {
        refreshButtons
    }, [refresh])

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(
        "/api/order-list",
        fetcher,
        { refreshInterval: 60000 }
    );

    if (!data) {
        return <div>Orders loading...</div>
    }
    const orders: IOrderTable[] = data

    function handleReceived(orderTable: IOrderTable): void {
        orders.map((item) => {
            if (orderTable.id === item.id) {
                item.status = "Received"
                refreshButtons(item)
                return
            }
        })
        setRefresh(!refresh)
    }

    function handleCreated(orderTable: IOrderTable): void {
        orders.map((item) => {
            if (orderTable.id === item.id) {
                item.status = "Created";
                refreshButtons(item)
                return
            }
        })
        setRefresh(!refresh)
    }

    function handleDone(orderTable: IOrderTable): void {
        orders.map((item) => {
            if (orderTable.id === item.id) {
                item.status = "Done";
                refreshButtons(item)
                return
            }
        })
        setRefresh(!refresh)
    }

    function handleShowOrderDetail(orderTable: IOrderTable): void {
        setShowViewCard(true)
        setOrderTable(orderTable)
    }

    return (
        <>
            <div className='mb-3'>
                <OrderItems />
            </div>
            <ListGroup as="ol" numbered hidden={!showOrderList}>
                {orders && Array.from({ length: orders?.length }).map((_, idx) => (
                    <ListGroup.Item key={idx}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Bàn {orders[idx].table_num} - ({orders[idx].created_at.toString()})</div>
                            <ButtonGroup size="sm">
                                <>{refreshButtons(orders[idx])}</>
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
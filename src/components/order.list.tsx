'use client'
import { useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import ViewCardDetail from "./view.cards.detail"
import useSWR, { mutate } from "swr"
import OrderListButtons from "./order.list.buttons"
import { toast } from "react-toastify"

interface IProps {
    showOrderList: boolean
}

function OrderList(props: IProps) {
    const { showOrderList } = props

    const inits: IOrderTables = { items: [] }
    const [showViewCard, setShowViewCard] = useState<boolean>(false)
    const [orderTable, setOrderTable] = useState<IOrderTable>({ id: 0, count_items: 0, price: 0, status: '', table_num: 0, created_at: new Date })

    const refreshButtons = (order: IOrderTable) => {
        return <>
            <OrderListButtons order={order} handleStatus={handleStatus} />
        </>
    }


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
    console.log(">>>>>>>>>>>>>>>UI revalidate order list: ", orders)

    function handleStatus(orderTable: IOrderTable, status: string): void {
        orders.map((item) => {
            if (orderTable.id === item.id) {
                item.status = status;
                refreshButtons(item)
                updateOrderStatus(item)
                return
            }
        })
    }

    function handleShowOrderDetail(orderTable: IOrderTable): void {
        setShowViewCard(true)
        setOrderTable(orderTable)
    }

    function updateOrderStatus(item: IOrderTable) {
        const id = item?.id
        const status = item?.status
        console.log(">>>>>>>>>>>>>>{id,status}", { id, status })
        fetch(`/api/update-order-status`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, status })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.warning("Update meal succeed !")
                    mutate("/api/order-list")
                }
            })
    }

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

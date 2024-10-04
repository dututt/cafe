'use client'
import OrderList from "@/components/order.list";
import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const Orders = () => {

    const [active, setActive] = useState({ 1: { "active_1": true }, 2: { "active_2": false }, 3: { "active_3": false } })
    const [trackingOrderStatus, setTrackingOrderStatus] = useState<ITrackingState>({ key: 'Accepted', value: true })

    function handleShowOrderList() {
        setActive({ 1: { "active_1": true }, 2: { "active_2": false }, 3: { "active_3": false } })
        setTrackingOrderStatus({ key: "Accepted", value: true })
    }

    function handleShowOrderListCreate() {
        setActive({ 1: { "active_1": false }, 2: { "active_2": true }, 3: { "active_3": false } })
        setTrackingOrderStatus({ key: "Received", value: true })
    }

    function handleShowOrderListDonne() {
        setActive({ 1: { "active_1": false }, 2: { "active_2": false }, 3: { "active_3": true } })
        setTrackingOrderStatus({ key: "Created", value: true })
    }

    return (
        <div>
            <ButtonGroup size="sm">
                <Button active={active[1].active_1} variant='outline-primary' onClick={() => handleShowOrderList()}>Món đã đặt</Button>
                <Button active={active[2].active_2} variant='outline-primary' onClick={() => handleShowOrderListCreate()}>Món đang tạo</Button>
                <Button active={active[3].active_3} variant='outline-primary' onClick={() => handleShowOrderListDonne()}>Món đã xong</Button>
            </ButtonGroup>
            <OrderList trackingOrderStatus={trackingOrderStatus} />

        </div>
    )
}
export default Orders
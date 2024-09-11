'use client'
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import OrderItems from "./get.order.list";


const Admin = () => {
    const [status, setStatus] = useState(false)

    function handleShowOrderList(): void {
        setStatus(!status)
        console.log(">>>>>>>>>>>>>>>status: ", status)
    }

    return (
        <>
            <ButtonGroup size="sm">
                <Button variant="outline-warning" onClick={() => handleShowOrderList()}>Quản lý đặt món</Button>
            </ButtonGroup>

            {status && <OrderItems />}
        </>
    );
}

export default Admin;
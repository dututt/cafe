'use client'
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import OrderItems from "./get.order.list";
import { GetServerSideProps } from "next";


const Admin = ({ props }: { props: any }) => {
    const [status, setStatus] = useState(false)

    console.log(">>>>>>props: ", props)

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



export const getServerSideProps: GetServerSideProps = async (context) => {
    // const res = await fetch('/api/order-list');
    // const user = await res.json();

    console.log(">>>>>>>>>>>>>>>>>>>>>>getServerSideProps: ")

    return {
        props: { harry: "Good boy" },
    };
};

export default Admin;
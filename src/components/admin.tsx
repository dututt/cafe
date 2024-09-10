'use client'
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";

export async function getInitialProps() {
    const response = await fetch('/api/order-list');
    const data = await response.json();
    console.log(">>>>>>>>>>>>1111 fetchData: ", data)
    return {
        props: { data },
        revalidate: 4, // Revalidate every 10 seconds
    };
}

const Admin = () => {
    const [status, setStatus] = useState(false)

    function handleShowOrderList(): void {
        getInitialProps()
    }

    return (
        <>
            <ButtonGroup size="sm">
                <Button variant="outline-warning" onClick={() => handleShowOrderList()}>Quản lý đặt món</Button>
            </ButtonGroup>

        </>
    );
}

export default Admin;
import { Button, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import useSWR from "swr";

function Admin() {
    const [status, setStatus] = useState(false)

    function handleShowOrderList(): void {
        setStatus(true)
    }

    useEffect(() => {
        fetch('/api/order-list')
            .then(res => { return res.json() })
            .then(data => console.log(">>>>>>>>>>>>>>>useEffect-data: ", data))
    }, [status])


    return (
        <>
            <ButtonGroup size="sm">
                <Button variant="outline-warning" onClick={() => handleShowOrderList()}>Quản lý đặt món</Button>
            </ButtonGroup>

        </>
    );
}
export default Admin;
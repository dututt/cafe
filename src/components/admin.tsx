import { Button, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

function Admin() {
    const [status, setStatus] = useState(false)

    function handleShowOrderList(): void {
        setStatus(true)
    }

    console.log(">>>>>>>>>>>>0000 fetchData: ", status)
    const fetchData = async () => {
        const response = await fetch('/api/order-list', {
            next: { revalidate: 10 } // Revalidate every 10 seconds
        });
        const data = await response.json();
        console.log(">>>>>>>>>>>>1111 fetchData: ", data)
        return data;
    };

    useEffect(() => {
        console.log(">>>>>>>>>>>>22222 fetchData- status: ", status)
        fetchData()
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
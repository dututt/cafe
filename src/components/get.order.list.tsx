import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function OrderItems() {
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        handleRefresh
    }, [refresh])

    function handleRefresh() {
        const data = fetch("/api/order-list")
            .then((res) => {
                console.log("111Data rendering on server....")
                return res.json();
            })

        if (!data) {
            return <div>Orders loading...</div>
        }
    }

    return (
        <>
            <Button variant="primary" onClick={() => handleRefresh()}>Refresh</Button>
        </>
    );
}

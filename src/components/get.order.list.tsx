import { revalidatePath } from "next/cache";
import { Button } from "react-bootstrap";

export default function OrderItems() {

    function handleRefresh() {
        const data = fetch("/api/order-list")
            .then((res) => {
                console.log("111Data rendering on server....")
                return res.json();
            })

        if (!data) {
            return <div>Orders loading...</div>
        }
        revalidatePath("/api/order-list")
    }

    return (
        <>
            <Button variant="primary" onClick={() => handleRefresh()}>Refresh</Button>
        </>
    );
}

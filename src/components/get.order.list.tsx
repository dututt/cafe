
export default function OrderItems() {

    const data = fetch("/api/order-list")
        .then((res) => {
            console.log("111Data rendering on server....")
            return res.json();
        })

    if (!data) {
        return <div>Orders loading...</div>
    } else {
        console.log(">>>>>>>>1111server load orders: ", data)
    }
    return (
        <>

        </>
    );
}

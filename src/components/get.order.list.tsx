import useSWR from "swr";

function OrderItems() {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(
        "/api/order-list",
        fetcher
    );

    if (!data) {
        return <div>Orders loading...</div>
    }
    console.log(">>>>>>>>>>>>>>>>>data: ", data)
    return (
        <>Hello: {data?.result?.rows?.length}</>
    );
}

export default OrderItems;
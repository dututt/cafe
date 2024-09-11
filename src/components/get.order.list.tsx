import { GetServerSideProps } from "next";

export default function OrderItems({ order_items }: { order_items: any }) {
    return (
        <>Hello: {order_items.result.rows}</>
    );
}



export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('/api/order-list');
    const order_items = await res.json();
    console.log(">>>>>>>>>>>>>>>>getServerSideProps: ", order_items)
    return {
        props: { order_items },
    };
};
import { Button, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

export async function getStaticProps() {
    const response = await fetch('/api/order-list');
    const data = await response.json();
    console.log(">>>>>>>>>>>>1111 fetchData: ", data)
    return {
        props: { data },
        revalidate: 4, // Revalidate every 10 seconds
    };
}


function Admin() {
    const [status, setStatus] = useState(false)

    function handleShowOrderList(): void {
        setStatus(true)
    }

    // console.log(">>>>>>>>>>>>0000 fetchData: ", status)
    // const fetchData = async () => {
    //     const response = await fetch('/api/order-list', {
    //         next: { revalidate: 4 } // Revalidate every 10 seconds
    //     });
    //     const data = await response.json();
    //     console.log(">>>>>>>>>>>>1111 fetchData: ", data)
    //     setStatus(false)
    //     return data;
    // };


    useEffect(() => {
        console.log(">>>>>>>>>>>>22222 fetchData- status: ", status)
        getStaticProps()
    })


    return (
        <>
            <ButtonGroup size="sm">
                <Button variant="outline-warning" onClick={() => handleShowOrderList()}>Quản lý đặt món</Button>
            </ButtonGroup>

        </>
    );
}
export default Admin;
import { Button } from "react-bootstrap"

interface IProps {
    order: IOrderTable
    handleStatus: (value: IOrderTable, status: string) => void
}

function OrderListButtons(props: IProps) {
    const { order, handleStatus } = props

    return (
        <>
            <Button disabled={!(order.status === "Accepted")} onClick={() => handleStatus(order, "Received")} variant="outline-primary">Đã nhận</Button>
            <Button disabled={!(order.status === "Received")} onClick={() => handleStatus(order, "Created")} variant="outline-warning">Đã tạo món</Button>
            <Button disabled={!(order.status === "Created")} onClick={() => handleStatus(order, "Done")} variant="outline-success">Xong</Button>
        </>
    )
}

export default OrderListButtons;
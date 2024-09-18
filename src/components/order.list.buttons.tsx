import { Button } from "react-bootstrap"

interface IProps {
    order: IOrderTable
    handleReceived: (value: IOrderTable) => void
    handleCreated: (value: IOrderTable) => void
    handleDone: (value: IOrderTable) => void
}

function OrderListButtons(props: IProps) {
    const { order, handleReceived, handleCreated, handleDone } = props

    return (
        <>
            <Button disabled={!(order.status === "Accepted")} onClick={() => handleReceived(order)} variant="outline-primary">Đã nhận</Button>
            <Button disabled={!(order.status === "Received")} onClick={() => handleCreated(order)} variant="outline-warning">Đang tạo món</Button>
            <Button disabled={!(order.status === "Created")} onClick={() => handleDone(order)} variant="outline-success">Xong</Button>
        </>
    )
}

export default OrderListButtons;
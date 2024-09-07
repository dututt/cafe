import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface IProps {
    selection: ISelection
    status: boolean
    refreshPrice: () => void
}

function Count(props: IProps) {
    const { selection, status, refreshPrice } = props
    const [count, setCount] = useState(selection.amount + 1)
    const [oldPrice] = useState(selection.item.price)
    const [price, setPrice] = useState(selection.item.price)

    selection.amount = count
    selection.item.price = price
    refreshPrice()

    const increment = () => {
        setCount(count + 1)
        setPrice(Number.parseInt(oldPrice.toString()) + Number.parseInt(price.toString()))
    }

    const decrement = () => {
        if (count <= 1) {
            return
        }
        setCount(count - 1)
        setPrice(Number.parseInt(price.toString()) - Number.parseInt(oldPrice.toString()))
    }
    return (
        <>
            <ButtonGroup size="sm">
                <Button disabled variant="outline-success">{count}</Button>
                <Button disabled={status} variant="outline-info" onClick={() => increment()}>Tăng</Button>
                <Button disabled={status} variant="outline-danger" onClick={() => decrement()}>Giảm</Button>
            </ButtonGroup>
        </>
    );
}
export default Count;
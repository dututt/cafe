import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface IProps {
    selection: ISelection
    status: boolean
    refreshPrice: () => void
}

function Count(props: IProps) {
    const { selection, status, refreshPrice } = props

    const [count, setCount] = useState<number>(selection.amount === 0 ? 1 : selection.amount)
    const [oldPrice] = useState(selection.item.price)
    const [price, setPrice] = useState<number>(selection.item.price)

    useEffect(() => {
        selection.amount = count
        selection.item.price_order = price
        refreshPrice()
    }, [count])

    const increment = () => {
        let co = count + 1
        setCount(co)
        let newPrice = co * Number.parseInt(oldPrice.toString())
        setPrice(newPrice)
    }

    const decrement = () => {
        if (count <= 1) {
            return
        }
        let co = count - 1
        setCount(co)
        let newPrice = co * Number.parseInt(oldPrice.toString())
        setPrice(newPrice)
    }

    return (
        <>
            <ButtonGroup size="sm">
                <Button disabled={status} size="lg" variant="outline-info" onClick={() => increment()}>+</Button>
                <Button disabled size="lg" variant="outline-success">{count}</Button>
                <Button disabled={status} size="lg" variant="outline-danger" onClick={() => decrement()}>-</Button>
            </ButtonGroup>
        </>
    );
}
export default Count;
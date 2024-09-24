import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface IProps {
    selects: ISelection[]
    selection: ISelection
    status: boolean
    refreshPrice: () => void
    deSelect: (value: ISelection) => void
}

function Count1(props: IProps) {
    const { selects, selection, status, refreshPrice, deSelect } = props

    const [count, setCount] = useState<number>(1)

    useEffect(() => {
        selects.map(item => {
            if (item.item.id === selection.item.id) {
                if (selection.amount === 0) {
                    selection.amount = 1
                    setCount(1)
                    selection.item.price_order = selection.item.price
                } else {
                    setCount(selection.amount)
                }
                return
            }
        })
        refreshPrice()
    }, [selection])

    useEffect(() => {
        refreshPrice()
    }, [count])

    const increment = () => {
        let co = count + 1
        setCount(co)
        selection.amount = co
        selection.item.price_order = co * Number.parseInt(selection.item.price.toString())
    }

    const decrement = () => {
        if (count <= 1) {
            return
        }
        let co = count - 1
        setCount(co)
        selection.amount = co
        selection.item.price_order = co * Number.parseInt(selection.item.price.toString())
    }

    return (
        <>
            <ButtonGroup size="sm">
                <Button disabled={status} size="lg" variant="outline-info" onClick={() => increment()}>+</Button>
                <Button disabled size="lg" variant="outline-success">{selection.amount}</Button>
                <Button disabled={status} size="lg" variant="outline-danger" onClick={() => decrement()}>-</Button>
            </ButtonGroup>{' '}
        </>
    );
}
export default Count1;
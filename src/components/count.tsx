import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface IProps {
    selection: ISelection
    status: boolean
}

function Count(props: IProps) {
    const { selection, status } = props
    const [count, setCount] = useState(selection.amount)

    const increment = () => {
        setCount(count + 1)
        selection.amount = count + 1
    }

    const decrement = () => {
        if (count <= 1) {
            return
        }
        setCount(count - 1)
        selection.amount = count - 1
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
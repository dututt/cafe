import { Badge, Button, ButtonGroup, ListGroup } from "react-bootstrap"

interface IProps {
    viewSelects: ISelections
    showOrderList: boolean
    setShowOrderList: (value: boolean) => void
}

const OrderList = (props: IProps) => {
    const { viewSelects, showOrderList, setShowOrderList } = props
    console.log(">>>>OrderList: ", viewSelects)

    return (
        <>
            <ListGroup as="ol" numbered hidden={!showOrderList}>
                {/* {Array.from({ length: viewSelects?.selections?.length }).map((_, idx) => ( */}
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Bàn 1</div>
                        <ButtonGroup size="sm">
                            <Button variant="outline-info">Đang tạo món</Button>
                            <Button variant="outline-danger">Xong</Button>
                        </ButtonGroup>
                    </div>
                    <Badge bg="primary" pill>
                        Số lượng (4)
                    </Badge>
                </ListGroup.Item>
                {/* ))} */}
            </ListGroup>
        </>
    )
}

export default OrderList;
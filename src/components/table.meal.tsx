'use client'
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateModal from './update.modal';
import CreateModal from './create.modal';
import { useEffect, useState } from 'react';
import OrderList from './order.list';
import deleteItem from '@/app/api/delete/delete';


interface IProps {
    setAcceptStatus: (value: boolean) => void
    acceptStatus: boolean
}

function TableMeal(props: IProps) {
    const { setAcceptStatus, acceptStatus } = props

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
    const [catalog, setCatalog] = useState<ICatalogPrice | null>(null)
    const [data, setData] = useState<ICatalogPrice[]>([])
    const [trackingOrderStatus, setTrackingOrderStatus] = useState<ITrackingState>({ key: 'Accepted', value: false })

    useEffect(() => {
        fetch('/api/food-beverage')
            .then(response => response.json())
            .then(data => setData(data));
    }, [catalog]);

    function handleShowModalCreate() {
        setShowModalCreate(true)
        setTrackingOrderStatus({ key: "", value: false })
    }

    function handleShowOrderList() {
        setTrackingOrderStatus({ key: "Accepted", value: true })
    }

    function handleShowOrderListCreate() {
        setTrackingOrderStatus({ key: "Received", value: true })
    }

    function handleShowOrderListDonne() {
        setTrackingOrderStatus({ key: "Created", value: true })
    }

    return (
        <>
            <ButtonGroup size="sm">
                <Button variant='outline-primary' onClick={() => handleShowOrderList()}>Món đã đặt</Button>
                <Button variant='outline-primary' onClick={() => handleShowOrderListCreate()}>Món đang tạo</Button>
                <Button variant='outline-primary' onClick={() => handleShowOrderListDonne()}>Món đã xong</Button>
                <Button variant='outline-primary' onClick={() => handleShowModalCreate()}>Thêm món mới</Button>
            </ButtonGroup>
            <Table striped bordered hover responsive size="sm" hidden={trackingOrderStatus.value}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Hình ảnh</th>
                        <th>Thể loại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <ButtonGroup size="sm">
                                        <Button variant="outline-warning" onClick={() => {
                                            setCatalog(item)
                                            setShowModalUpdate(true)
                                        }}>Sửa</Button>
                                        <Button variant="outline-info">Xem</Button>
                                        <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>Xóa</Button>
                                    </ButtonGroup>
                                </td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.image}</td>
                                <td>{item.type}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <OrderList trackingOrderStatus={trackingOrderStatus} />
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
                data={data}
            />

            <UpdateModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                catalog={catalog}
                setCatalog={setCatalog}
            />
        </>
    );
}

export default TableMeal;
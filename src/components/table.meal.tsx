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
    const [showOrderList, setShowOrderList] = useState<boolean>(false)
    const [catalog, setCatalog] = useState<ICatalogPrice | null>(null)
    const [data, setData] = useState<ICatalogPrice[]>([])

    useEffect(() => {
        fetch('/api/food-beverage')
            .then(response => response.json())
            .then(data => setData(data));
    }, [catalog]);

    function handleShowModalCreate() {
        setShowModalCreate(true)
        setShowOrderList(false)
    }

    function handleShowOrderList() {
        setShowOrderList(true)
    }

    return (
        <>
            <div className='mb-3'
                style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant='outline-primary' onClick={() => handleShowOrderList()}>Danh sách đặt món</Button>
                <Button variant='outline-primary' onClick={() => handleShowModalCreate()}>Thêm món mới</Button>
            </div>
            <Table striped bordered hover responsive size="sm" hidden={showOrderList}>
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

            <OrderList showOrderList={showOrderList} />
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
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
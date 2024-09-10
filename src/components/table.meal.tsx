'use client'
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateModal from './update.modal';
import CreateModal from './create.modal';
import { useEffect, useState } from 'react';
import OrderList from './order.list';
import deleteItem from '@/app/api/delete/delete';
import Admin from './admin';


interface IProps {
    setAcceptStatus: (value: boolean) => void
}

function TableMeal(props: IProps) {
    const { setAcceptStatus } = props

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
    const [showOrderList, setShowOrderList] = useState<boolean>(false)
    const [catalog, setCatalog] = useState<ICatalogPrice | null>(null)
    const [iSelects, setISelects] = useState<ISelections>({ selections: [] })
    const [data, setData] = useState<ICatalogPrice[]>([])

    function handleShowModalCreate() {
        setShowModalCreate(true)
        setShowOrderList(false)
    }

    function handleShowOrderList() {
        setShowOrderList(true)
    }

    useEffect(() => {
        fetch('/api/fetch')
            .then(async (response) => {
                const data = await response.json();

                setData(data?.result?.rows)
            })
    }, [catalog])

    const items: ICatalogPrice[] = data

    return (
        <>
            <div className='mb-3'
                style={{ display: "flex", justifyContent: "space-between" }}>
                {/* <h3>Quản lý danh sách món</h3> */}
                <Button variant='outline-primary' onClick={() => handleShowOrderList()}>Danh sách đặt món</Button>
                <Button variant='outline-primary' onClick={() => handleShowModalCreate()}>Thêm món mới</Button>

                <Admin />
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
                    {items?.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.image}</td>
                                <td>{item.type}</td>
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
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <OrderList showOrderList={showOrderList} setAcceptStatus={setAcceptStatus} />
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
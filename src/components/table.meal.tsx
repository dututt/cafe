'use client'
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateModal from './update.modal';
import CreateModal from './create.modal';
import { useState } from 'react';
import OrderList from './order.list';
import deleteItem from '@/app/api/delete/delete';
import { mutate } from 'swr';

interface IProps {
    iSelects: ISelections
    viewSelects: ISelections
    setAcceptStatus: (value: boolean) => void
}

function TableMeal(props: IProps) {
    const { iSelects, viewSelects, setAcceptStatus } = props

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
    const [showOrderList, setShowOrderList] = useState<boolean>(false)
    const [catalog, setCatalog] = useState<ICatalogPrice | null>(null)

    function handleShowModalCreate() {
        setShowModalCreate(true)
        setShowOrderList(false)
    }

    function handleShowOrderList() {
        mutate("/api/order-list")
        setShowOrderList(true)
    }

    return (
        <>
            <div className='mb-3'
                style={{ display: "flex", justifyContent: "space-between" }}>
                {/* <h3>Quản lý danh sách món</h3> */}
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
                    {iSelects.selections?.map(catalog => {
                        return (
                            <tr key={catalog.item.id}>
                                <td>{catalog.item.id}</td>
                                <td>{catalog.item.title}</td>
                                <td>{catalog.item.content}</td>
                                <td>{catalog.item.image}</td>
                                <td>{catalog.item.type}</td>
                                <td>
                                    <ButtonGroup size="sm">
                                        <Button variant="outline-warning" onClick={() => {
                                            setCatalog(catalog.item)
                                            setShowModalUpdate(true)
                                        }}>Sửa</Button>
                                        <Button variant="outline-info">Xem</Button>
                                        <Button variant="outline-danger" onClick={() => deleteItem(catalog.item.id)}>Xóa</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <OrderList viewSelects={viewSelects} showOrderList={showOrderList} setAcceptStatus={setAcceptStatus} />
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
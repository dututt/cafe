'use client'
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateModal from './update.modal';
import CreateModal from './create.modal';
import { useState } from 'react';
import OrderList from './order.list';
import deleteItem from '@/app/api/delete/delete';

interface IProps {
    catalogs: ICatalog[];
    viewSelects: ISelections
    acceptStatus: boolean
    setAcceptStatus: (value: boolean) => void
    useCustom: {
        orderTables: IOrderTables
    }
}

function TableMeal(props: IProps) {
    const { catalogs, viewSelects, acceptStatus, setAcceptStatus, useCustom } = props

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
    const [showOrderList, setShowOrderList] = useState<boolean>(false)
    const [catalog, setCatalog] = useState<ICatalog | null>(null)

    function handleShowModalCreate() {
        setShowModalCreate(true)
        setShowOrderList(false)
    }

    return (
        <>
            <div className='mb-3'
                style={{ display: "flex", justifyContent: "space-between" }}>
                {/* <h3>Quản lý danh sách món</h3> */}
                <Button variant='outline-primary' onClick={() => setShowOrderList(true)}>Danh sách đặt món</Button>
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
                    {catalogs.map(catalog => {
                        return (
                            <tr key={catalog.id}>
                                <td>{catalog.id}</td>
                                <td>{catalog.title}</td>
                                <td>{catalog.content}</td>
                                <td>{catalog.image}</td>
                                <td>{catalog.type}</td>
                                <td>
                                    <ButtonGroup size="sm">
                                        <Button variant="outline-warning" onClick={() => {
                                            setCatalog(catalog)
                                            setShowModalUpdate(true)
                                        }}>Sửa</Button>
                                        <Button variant="outline-info">Xem</Button>
                                        <Button disabled variant="outline-danger" onClick={() => deleteItem(catalog.id)}>Xóa</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            {useCustom && viewSelects.selections.length > 0 ? <OrderList viewSelects={viewSelects} showOrderList={showOrderList} setAcceptStatus={setAcceptStatus} useCustom={useCustom} /> : []}

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
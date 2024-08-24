'use client'
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateModal from './update.modal';
import CreateModal from './create.modal';
import { useState } from 'react';
import OrderList from './order.list';

interface IProps {
    catalogs: ICatalog[];
    viewSelects: ISelections
}

function TableMeal(props: IProps) {
    const { catalogs, viewSelects } = props

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
                                        <Button variant="outline-danger">Xóa</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <OrderList viewSelects={viewSelects} showOrderList={showOrderList} setShowOrderList={setShowOrderList} />

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
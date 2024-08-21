import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateModal from './update.modal';
import CreateModal from './create.modal';
import { useState } from 'react';

interface IProps {
    catalogs: ICatalog[];
}

const TableMeal = (props: IProps) => {
    const { catalogs } = props

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
    const [catalog, setCatalog] = useState<ICatalog | null>(null)

    return (
        <>
            <div className='mb-3'
                style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Meal</h3>
                <Button variant='secondary' onClick={() => setShowModalCreate(true)}>Add new</Button>
            </div>
            <Table striped bordered hover responsive size="sm">
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
                                    <Button variant="outline-warning"
                                        className='mx-3'
                                        onClick={() => {
                                            setCatalog(catalog)
                                            setShowModalUpdate(true)
                                        }}
                                    >Sửa</Button>
                                    <Button variant="outline-info" className='mx-3'>Xem</Button>
                                    <Button variant="outline-danger">Xóa</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

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
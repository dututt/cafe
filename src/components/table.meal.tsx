'use client'
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UpdateModal from './update.modal';
import CreateModal from './create.modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

function TableMeal() {

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
    const [catalog, setCatalog] = useState<ICatalogPrice | null>(null)
    const [data, setData] = useState<ICatalogPrice[]>([])
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        fetch('/api/food-beverage')
            .then(response => response.json())
            .then(data => setData(data));
    }, [catalog]);

    function handleShowModalCreate() {
        setShowModalCreate(true)
    }

    const handleDeleteItem = (id: number) => {
        fetch(`/api/food-beverage-delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.warning("Delete meal succeed !")
                    mutate("/api/food-beverage")
                }
            })
    }

    return (
        <>
            <ButtonGroup size="sm">
                <Button variant='outline-primary' onClick={() => handleShowModalCreate()}>Thêm thực đơn</Button>
            </ButtonGroup>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Hình ảnh</th>
                        <th>Thể loại</th>
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
                                        <Button disabled variant="outline-danger" onClick={() => handleDeleteItem(item.id)}>Xóa</Button>
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
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

interface IProps {
    catalogs: ICatalog[];
}

const TableMeal = (props: IProps) => {
    const { catalogs } = props
    return (
        <Table bordered hover size='sm'>
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
                                <Button variant="outline-warning">Sửa</Button>
                                <Button variant="outline-info" className='mx-3'>Xem</Button>
                                <Button variant="outline-danger">Xóa</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default TableMeal;
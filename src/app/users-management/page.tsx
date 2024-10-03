'use client'
import { Button, ButtonGroup, Table } from "react-bootstrap";
import useSWR from "swr";

const Users = () => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "/api/users",
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true
        }
    );

    if (data?.error || error) return <div>Failed to load</div>;
    if (isLoading) {
        return <>loading...</>
    }
    const users: IUser[] = data

    return (
        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th></th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users?.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <ButtonGroup size="sm">
                                    <Button variant="outline-warning">Sửa</Button>
                                    <Button variant="outline-info">Xem</Button>
                                    <Button disabled variant="outline-danger">Xóa</Button>
                                </ButtonGroup>
                            </td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}
export default Users;
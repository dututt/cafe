"use client";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import useSWR from "swr";
import CurrencyDisplay from "../utils/currency.display";

const Orders = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/order-list", fetcher, {
    refreshInterval: 60000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (data?.error || error) return <div>Failed to load</div>;
  if (isLoading) {
    return <>loading...</>;
  }
  const orders: IOrderTable[] = data;
  return (
    <div>
      <Button variant="outline-primary">Quản lý danh sách đơn hàng</Button>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Số bàn</th>
            <th>Tổng giá</th>
            <th>Tình trạng</th>
            <th>Số lượng món</th>
            <th>Ngày</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <ButtonGroup size="sm">
                    <Button variant="outline-warning">Sửa</Button>
                    <Button variant="outline-info">Xem</Button>
                    <Button disabled variant="outline-danger">
                      Xóa
                    </Button>
                  </ButtonGroup>
                </td>
                <td>{item.table_num}</td>
                <td>
                  <CurrencyDisplay amount={item.price} />
                </td>
                <td>{item.status}</td>
                <td>{item.count_items}</td>
                <td>{item.created_at.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default Orders;

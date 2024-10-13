"use client";
import { Button, Table } from "react-bootstrap";
import useSWR from "swr";
import CurrencyDisplay from "../utils/currency.display";
import OrderDetail from "./order-detail";
import { useState } from "react";

const Orders = () => {
  const [showModalOrderDetail, setShowModalOrderDetail] =
    useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<IOrderTable | null>(null);

  const statusObject: Map<string, string> = new Map([
    ["Accepted", "Đồng ý"],
    ["Received", "Đã nhận"],
    ["Created", "Đã tạo món"],
    ["Done", "Xong"],
  ]);

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

  function showOrderDetail(item: IOrderTable) {
    setShowModalOrderDetail(true);
    setOrderDetail(item);
  }

  return (
    <>
      <OrderDetail
        orderDetail={orderDetail}
        showModalOrderDetail={showModalOrderDetail}
        setShowModalOrderDetail={setShowModalOrderDetail}
      />
      <div>
        <Button variant="outline-primary">Quản lý danh sách đơn hàng</Button>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>#</th>
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
                <tr key={idx} onClick={(e) => showOrderDetail(item)}>
                  <td>{idx + 1}</td>
                  <td>{item.table_num}</td>
                  <td>
                    <CurrencyDisplay amount={item.price} />
                  </td>
                  <td>{statusObject.get(item.status)}</td>
                  <td>{item.count_items}</td>
                  <td>{item.created_at.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default Orders;

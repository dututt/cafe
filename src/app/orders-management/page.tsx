"use client";
import { Button, Table } from "react-bootstrap";
import CurrencyDisplay from "../utils/currency.display";
import OrderDetail from "./order-detail";
import { useState } from "react";
import { GetOrders } from "@/components/actions";

const Orders = () => {
  const [showModalOrderDetail, setShowModalOrderDetail] =
    useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<IOrderTable | null>(null);

  const statusObject: Map<string, string> = new Map([
    ["Accepted", "Đồng ý"],
    ["Received", "Đã nhận"],
    ["Created", "Đã tạo món"],
    ["Served", "Phục vụ"],
    ["Done", "Đã thanh toán"],
  ]);

  const orders: IOrderTable[] = GetOrders();

  function showOrderDetail(item: IOrderTable) {
    setShowModalOrderDetail(true);
    setOrderDetail(item);
  }

  return (
    <>
      {showModalOrderDetail && (
        <OrderDetail
          orderDetail={orderDetail}
          showModalOrderDetail={showModalOrderDetail}
          setShowModalOrderDetail={setShowModalOrderDetail}
        />
      )}
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

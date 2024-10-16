"use client";
import { Button, Table } from "react-bootstrap";
import CurrencyDisplay from "../utils/currency.display";
import OrderDetail from "./order-detail";
import { useState } from "react";
import { GetOrders, UpdateOrderStatus } from "@/components/actions";
import { toast } from "react-toastify";

const Orders = () => {
  const [showModalOrderDetail, setShowModalOrderDetail] =
    useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<IOrderTable | null>(null);
  const [payBillTotal, setPayBillTotal] = useState<number>(0);

  const statusObject: Map<string, string> = new Map([
    ["Accepted", "Đồng ý"],
    ["Received", "Đã nhận"],
    ["Created", "Đã tạo món"],
    ["Served", "Phục vụ"],
    ["Done", "Đã thanh toán"],
    ["Mixed", "Đã gộp"],
  ]);

  const orders: IOrderTable[] = GetOrders();

  function showOrderDetail(item: IOrderTable) {
    setPayBillTotal(
      orders.reduce((acc, order) => {
        if (order.table_num === item.table_num && order.status !== "Done") {
          acc = acc + Number.parseInt(order.price.toString());
        }
        return acc;
      }, 0)
    );

    if (item.status === "Mixed") {
      toast.warning(`Hiện tại bàn này đã gộp vào bàn ${item.table_num}!`);
      return;
    }
    setShowModalOrderDetail(true);
    setOrderDetail(item);
  }

  function handlePaymentBill(): void {
    orders.forEach((order) => {
      if (
        order.table_num === orderDetail?.table_num &&
        order.status !== "Done"
      ) {
        UpdateOrderStatus(order?.id ?? 0, "Done");
      }
    });
  }

  return (
    <>
      {showModalOrderDetail && (
        <OrderDetail
          orderDetail={orderDetail}
          payBillTotal={payBillTotal}
          handlePaymentBill={handlePaymentBill}
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

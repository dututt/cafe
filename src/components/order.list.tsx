"use client";
import { useState } from "react";
import { Badge, Button, ButtonGroup, ListGroup } from "react-bootstrap";
import ViewCardDetail from "./view.cards.detail";
import useSWR, { mutate } from "swr";
import OrderListButtons from "./order.list.buttons";
import { toast } from "react-toastify";
import OrderDetail from "@/app/orders-management/order-detail";

interface IProps {
  trackingOrderStatus: ITrackingState;
}

function OrderList(props: IProps) {
  const { trackingOrderStatus } = props;

  const inits: IOrderTables = { items: [] };
  const [showViewCard, setShowViewCard] = useState<boolean>(false);
  const [orderTable, setOrderTable] = useState<IOrderTable>(inits.items[0]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/order-list", fetcher, {
    refreshInterval: 60000,
    revalidateIfStale: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  if (data?.error || error) return <div>Failed to load</div>;
  if (isLoading) return <div>Orders loading...</div>;

  const refreshButtons = (order: IOrderTable) => {
    return (
      <>
        <OrderListButtons order={order} handleStatus={handleStatus} />
      </>
    );
  };

  const _orders: IOrderTable[] = data;
  const orders = _orders?.filter(
    (item) => item.status === trackingOrderStatus.key
  );

  function handleStatus(orderTable: IOrderTable, status: string): void {
    orders?.map((item) => {
      if (orderTable.id === item.id) {
        item.status = status;
        updateOrderStatus(item);
        refreshButtons(item);
        return;
      }
    });
  }

  function handleShowOrderDetail(orderTable: IOrderTable): void {
    setShowViewCard(true);
    setOrderTable(orderTable);
  }

  function updateOrderStatus(item: IOrderTable) {
    const id = item?.id;
    const status = item?.status;

    fetch(`/api/update-order-status`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.warning("Update order status succeed !");
          mutate("/api/order-list");
        }
      });
  }

  return (
    <>
      <ListGroup as="ol" numbered hidden={!trackingOrderStatus.value}>
        <div hidden={orders.length > 0}>Không có đơn hàng!</div>
        {orders &&
          Array.from({ length: orders?.length }).map((_, idx) => (
            <ListGroup.Item
              key={idx}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  Bàn {orders[idx].table_num} - (
                  {orders[idx].created_at.toString()})
                </div>
                <ButtonGroup size="sm">
                  <>{refreshButtons(orders[idx])}</>
                </ButtonGroup>
              </div>
              <Button
                variant="primary"
                onClick={() => handleShowOrderDetail(orders[idx])}
              >
                <Badge bg="secondary">{orders[idx].count_items}</Badge> Món
                <span className="visually-hidden">unread messages</span>
              </Button>
            </ListGroup.Item>
          ))}
      </ListGroup>

      {/* <ViewCardDetail
        showViewCard={showViewCard}
        setShowViewCard={setShowViewCard}
        orderTable={orderTable}
      /> */}

      {showViewCard && (
        <OrderDetail
          orderDetail={orderTable}
          showModalOrderDetail={showViewCard}
          setShowModalOrderDetail={setShowViewCard}
        />
      )}
    </>
  );
}

export default OrderList;

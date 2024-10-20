import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Modal,
  Nav,
  Row,
} from "react-bootstrap";
import useSWR from "swr";
import { toast } from "react-toastify";
import TableManagement from "./table";
import PayBill from "./paybill";
import Home from "../page";

interface IProps {
  orderDetail: IOrderTable | null;
  payBillTotal: number;
  handlePaymentBill: () => void;
  showModalOrderDetail: boolean;
  setShowModalOrderDetail: (value: boolean) => void;
}

function OrderDetail({
  orderDetail,
  payBillTotal,
  handlePaymentBill,
  showModalOrderDetail,
  setShowModalOrderDetail,
}: IProps) {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [state, setState] = useState<boolean>(false); //false:change; true:mix
  const [selected, setSelected] = useState<string>("");

  const id = orderDetail ? orderDetail.id : 0;

  useEffect(() => {
    setModalTitle(`Chi tiết đơn hàng - Bàn ${orderDetail?.table_num}`);
  }, [orderDetail?.table_num]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`/api/order-items?id=${id}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (!data) {
    return <div>Order items loading...</div>;
  }
  const order_items: IOrderItem[] = data;

  function handleChangeTable(status: boolean): void {
    setModalTitle(`Chuyển bàn - Bàn ${orderDetail?.table_num} ==> ...`);
    setState(false);
    setSelected("select-table");
  }

  function handleMixTable(status: boolean): void {
    setModalTitle(`Gộp bàn - Bàn ${orderDetail?.table_num} ==> ...`);
    setState(true);
    setSelected("select-table");
  }

  function handleShowModalOrderDetail(status: boolean): void {
    setModalTitle(`Chi tiết đơn hàng - Bàn ${orderDetail?.table_num}`);
    setShowModalOrderDetail(status);
  }

  function handleSelectCurrentTable(numTable: number): void {
    if (numTable === orderDetail?.table_num) {
      toast.warning("Hãy chọn số bàn khác số bàn hiện tại!");
      return;
    }
    setModalTitle(`Chi tiết đơn hàng - Bàn ${numTable}`);
    setSelected("");
    const status = state ? "Mixed" : undefined;
    fetch(`/api/update-order-num-table`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, numTable, status }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.warning("Update order number table succeed !");
        }
      });
  }

  function handleShowQRBank() {
    setModalTitle(`Mã thanh toán - Bàn ${orderDetail?.table_num}`);
    setSelected("pay-bill");
  }

  function handleLoadMenu(): void {
    setModalTitle(`Thêm thực đơn - Bàn ${orderDetail?.table_num}`);
    setSelected("add-more");
  }

  return (
    <>
      <Modal
        size="lg"
        show={showModalOrderDetail}
        onHide={() => handleShowModalOrderDetail(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Button
            variant=""
            className="material-icons"
            onClick={() => setSelected("")}
          >
            home
          </Button>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Footer className="p-0">
          {orderDetail?.status === "Done" && (
            <Button variant="outline-primary">Hóa đơn đã thanh toán</Button>
          )}
          <ButtonGroup hidden={orderDetail?.status === "Done"}>
            <Button
              variant="outline-primary"
              className="material-icons"
              onClick={() => handleShowQRBank()}
            >
              account_balance
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleChangeTable(true)}
            >
              Chuyển bàn
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleMixTable(true)}
            >
              Gộp bàn
            </Button>
            <Button variant="outline-primary" onClick={() => handleLoadMenu()}>
              Thêm món
            </Button>
            <Button
              variant="outline-danger"
              className="material-icons"
              disabled={
                !(
                  orderDetail?.status === "Accepted" ||
                  orderDetail?.status === "Received"
                )
              }
              onClick={() => handleShowQRBank()}
            >
              remove_shopping_cart
            </Button>
          </ButtonGroup>
        </Modal.Footer>
        <Modal.Body className="p-0">
          {selected === "pay-bill" && (
            <PayBill
              orderDetail={orderDetail}
              payBillTotal={payBillTotal}
              handlePaymentBill={handlePaymentBill}
            />
          )}
          {selected === "add-more" && <Home />}
          {selected === "select-table" && (
            <TableManagement
              selectCurrentTable={handleSelectCurrentTable}
              state={state}
            />
          )}
          {selected === "" && (
            <Row xs={1} md={2} className="g-0 p-0">
              {Array.from({ length: order_items.length }).map((_, idx) => (
                <Col key={idx}>
                  <Card style={{ height: "7rem" }}>
                    <Row>
                      <Col>
                        <Card.Img
                          variant="top"
                          style={{ height: "6rem" }}
                          className="card-img-top fixed-size-m"
                          src={order_items[idx].image}
                        />
                      </Col>
                      <Col>
                        <Card.Body className="m-0 p-0">
                          <Card.Title>{order_items[idx].title}</Card.Title>
                        </Card.Body>
                        <Card.Footer>
                          {order_items[idx].item_num} Phần
                        </Card.Footer>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default OrderDetail;

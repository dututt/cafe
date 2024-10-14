import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Modal, Row } from "react-bootstrap";
import useSWR from "swr";
import { toast } from "react-toastify";
import TableManagement from "./table";
import PayBill from "./paybill";

interface IProps {
  orderDetail: IOrderTable | null;
  showModalOrderDetail: boolean;
  setShowModalOrderDetail: (value: boolean) => void;
}

function OrderDetail({
  orderDetail,
  showModalOrderDetail,
  setShowModalOrderDetail,
}: IProps) {
  const [showStatusTables, setShowStatusTables] = useState<boolean>(false);
  const [showCartQR, setShowCartQR] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [state, setState] = useState<boolean>(false); //false:change; true:mix

  const id = orderDetail ? orderDetail.id : 0;

  useEffect(() => {
    setModalTitle(`Chi tiết đơn hàng - Bàn ${orderDetail?.table_num}`);
  }, [orderDetail?.table_num]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`/api/order-items?id=${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!data) {
    return <div>Order items loading...</div>;
  }
  const order_items: IOrderItem[] = data;

  function handleChangeTable(status: boolean): void {
    setModalTitle(`Chuyển bàn - Bàn ${orderDetail?.table_num} ==> ...`);
    setState(false);
    setShowStatusTables(status);
  }

  function handleMixTable(status: boolean): void {
    setModalTitle(`Gộp bàn - Bàn ${orderDetail?.table_num} ==> ...`);
    setState(true);
    setShowStatusTables(status);
  }

  function handleShowModalOrderDetail(status: boolean): void {
    setModalTitle(`Chi tiết đơn hàng - Bàn ${orderDetail?.table_num}`);
    setShowModalOrderDetail(status);
  }

  function handleSelectCurrentTable(numTable: number): void {
    setModalTitle(`Chi tiết đơn hàng - Bàn ${numTable}`);
    setShowStatusTables(false);
    fetch(`/api/update-order-num-table`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, numTable }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.warning("Update order number table succeed !");
        }
      });
  }

  function handleShowQRBank() {
    setShowCartQR(true);
  }

  return (
    <>
      {showCartQR && (
        <PayBill showCartQR={showCartQR} setShowCartQR={setShowCartQR} />
      )}
      <Modal
        show={showModalOrderDetail}
        onHide={() => handleShowModalOrderDetail(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {showStatusTables ? (
            <TableManagement
              selectCurrentTable={handleSelectCurrentTable}
              state={state}
            />
          ) : (
            <Row xs={1} md={2} className="g-0">
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
                        <Card.Body className="m-0 p-1">
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
        <Modal.Footer>
          <ButtonGroup>
            <Button
              variant="outline-warning"
              onClick={() => handleShowQRBank()}
            >
              Thanh toán
            </Button>
            <Button
              variant="outline-warning"
              onClick={() => handleChangeTable(true)}
            >
              Chuyển bàn
            </Button>
            <Button
              variant="outline-warning"
              onClick={() => handleMixTable(true)}
            >
              Gộp bàn
            </Button>
            <Button variant="outline-primary">Thêm món</Button>
            <Button variant="outline-danger">Hủy</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default OrderDetail;

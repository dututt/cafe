"use client";

import { Button, ButtonGroup, Card, Col, Modal, Row } from "react-bootstrap";
import { useCart } from "./cart.context";
import { useState } from "react";
import CurrencyDisplay from "@/app/utils/currency.display";
import QrScanner from "./qr.code.scanner";
import OrderStatus from "./order.status";
import { toast } from "react-toastify";

interface IProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

function ViewCardOrder({ show, setShow }: IProps) {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [decodedText, setDecodedText] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [changeTextStatus, setChangeTextStatus] = useState<string>("");
  const { state } = useCart();

  const total = state.items.reduce(
    (acc, item) => (acc = acc + item.item.price * item.amount),
    0
  );

  function handleAcceptView(): void {
    setStatus(true);
    handleChangeTextStatus();

    let numTable = !decodedText ? 0 : Number.parseInt(decodedText);
    const selectedItems = state.items;
    const status = "Accepted";
    fetch("/api/create-order", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numTable, total, selectedItems, status }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          toast.success("Create new order succeed !");
        }
      });
  }

  function handleChangeTextStatus() {
    setChangeTextStatus("Thực đơn đã gửi...");
  }

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header
          closeButton
          className="d-flex justify-content-between align-items-start"
        >
          <Button
            variant=""
            className="material-icons p-1"
            onClick={() => setShowQRCode(true)}
          >
            qr_code_scanner
          </Button>

          <Modal.Title>
            {decodedText === ""
              ? "Quét QR để tạo thực đơn!"
              : "Thực đơn đã chọn - số bàn: " + decodedText}
          </Modal.Title>
        </Modal.Header>
        <Card.Footer className="text-muted">
          <ButtonGroup size="lg">
            <OrderStatus status={status} changeTextStatus={changeTextStatus} />
            <Button variant="outline-warning">Tổng Giá</Button>
            <Button variant="outline-danger">
              <CurrencyDisplay amount={state.items.length > 0 ? total : 0} />
            </Button>
            <Button
              variant="outline-success"
              disabled={
                !(state.items.length > 0) || status || decodedText === ""
              }
              onClick={() => handleAcceptView()}
            >
              Đồng ý
            </Button>
          </ButtonGroup>
        </Card.Footer>
        <Modal.Body className="p-0">
          <div className="grow space-y-1">
            <Row xs={1} md={2} className="g-0">
              {Array.from({ length: state.items?.length }).map((_, idx) => (
                <Col key={idx}>
                  <Card style={{ height: "8rem" }}>
                    <Row>
                      <Col>
                        <Card.Img
                          variant="top"
                          style={{ height: "7rem", width: "10rem" }}
                          className="card-img-center fixed-size p-1"
                          src={state.items[idx].item.image}
                        />
                      </Col>
                      <Col className="flex items-center gap-3">
                        <Card.Body className="p-1">
                          <Card.Title className="d-flex justify-content-between align-items-start font-semibold p-0">
                            {state.items[idx].item.title}
                          </Card.Title>
                          <Button variant="outline-primary" className="p-0">
                            <CurrencyDisplay
                              amount={state.items[idx].item.price}
                            />
                          </Button>{" "}
                          X {state.items[idx].amount} phần
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={showQRCode}
        onHide={() => setShowQRCode(false)}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-between p-0">
          {showQRCode && <QrScanner setDecodedText={setDecodedText} />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewCardOrder;

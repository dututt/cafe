import { Button, Card, Modal } from "react-bootstrap";
import CurrencyDisplay from "../utils/currency.display";
import { UpdateOrderStatus } from "@/components/actions";

interface IProps {
  orderDetail: IOrderTable | null;
  showCartQR: boolean;
  setShowCartQR: (value: boolean) => void;
}

function PayBill({ orderDetail, showCartQR, setShowCartQR }: IProps) {
  function handlePaymentBill(): void {
    UpdateOrderStatus(orderDetail?.id ?? 0, "Done");
  }

  return (
    <>
      <Modal
        show={showCartQR}
        onHide={() => setShowCartQR(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Mã thanh toán</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="/uploads/375e375932404955c997b5b00.jpg"
            />
            <Card.Body>
              <Card.Title>
                Tổng hóa đơn:{" "}
                <CurrencyDisplay amount={orderDetail?.price ?? 0} />
              </Card.Title>
              <Card.Text>Quét mã QR để thanh toán hóa đơn</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="outline-primary"
                onClick={() => handlePaymentBill()}
              >
                Thanh toán thành công
              </Button>
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default PayBill;

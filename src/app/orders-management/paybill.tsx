import { Button, Card, Modal } from "react-bootstrap";
import CurrencyDisplay from "../utils/currency.display";

interface IProps {
  orderDetail: IOrderTable | null;
  payBillTotal: number;
  handlePaymentBill: () => void;
  showCartQR: boolean;
  setShowCartQR: (value: boolean) => void;
}

function PayBill({
  orderDetail,
  payBillTotal,
  handlePaymentBill,
  showCartQR,
  setShowCartQR,
}: IProps) {
  function paymentBill(): void {
    handlePaymentBill();
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
          <Modal.Title>
            Mã thanh toán - Bàn {orderDetail?.table_num}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="/uploads/375e375932404955c997b5b00.jpg"
            />
            <Card.Body>
              <Card.Title>
                Tổng hóa đơn: <CurrencyDisplay amount={payBillTotal} />
              </Card.Title>
              <Card.Text>Quét mã QR để thanh toán hóa đơn</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="outline-primary" onClick={() => paymentBill()}>
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

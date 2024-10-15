import { Card, Modal } from "react-bootstrap";

interface IProps {
  showCartQR: boolean;
  setShowCartQR: (value: boolean) => void;
}

function PayBill({ showCartQR, setShowCartQR }: IProps) {
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

        <Modal.Body>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="/uploads/375e375932404955c997b5b00.jpg"
            />
            <Card.Body>
              <Card.Title>Mã Ngân hàng</Card.Title>
              <Card.Text>Quét mã QR để thanh toán hóa đơn</Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default PayBill;

import { Button, Card } from "react-bootstrap";
import CurrencyDisplay from "../utils/currency.display";

interface IProps {
  orderDetail: IOrderTable | null;
  payBillTotal: number;
  handlePaymentBill: () => void;
}

function PayBill({ orderDetail, payBillTotal, handlePaymentBill }: IProps) {
  function paymentBill(): void {
    handlePaymentBill();
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="/uploads/375e375932404955c997b5b00.jpg" />
      <Card.Body>
        <Card.Text>
          Tổng hóa đơn: <CurrencyDisplay amount={payBillTotal} />
        </Card.Text>
        <Card.Text>Quét mã QR để thanh toán hóa đơn</Card.Text>
        <Button variant="outline-primary" onClick={() => paymentBill()}>
          Thanh toán thành công
        </Button>
      </Card.Body>
    </Card>
  );
}
export default PayBill;

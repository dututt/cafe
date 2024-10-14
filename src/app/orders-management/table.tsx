import { GetOrders } from "@/components/actions";
import { Button, Row } from "react-bootstrap";

interface IProps {
  selectCurrentTable: (value: number) => void;
  state: boolean;
}

export default function TableManagement({ selectCurrentTable, state }: IProps) {
  const orders: IOrderTable[] = GetOrders();

  const numOrderedTables: number[] = Array.from(
    new Set(orders.map((order) => order.table_num))
  );

  function handleSelectCurrentTable(value: number) {
    selectCurrentTable(value);
  }

  function checkStatus(value: number) {
    if (state) {
      return numOrderedTables.includes(value) ? false : true; //mix table
    } else {
      return numOrderedTables.includes(value) ? true : false; //change table
    }
  }

  return (
    <>
      <Row xs={4} className="g-0">
        {Array.from({ length: 50 }, (_, i) => i + 1).map((_, idx) => (
          <Button
            key={idx}
            disabled={checkStatus(idx + 1)}
            variant={
              checkStatus(idx + 1) ? "outline-primary" : "outline-success"
            }
            onClick={() => handleSelectCurrentTable(idx + 1)}
          >
            Bàn {idx + 1}
          </Button>
        ))}
      </Row>
    </>
  );
}

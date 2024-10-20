import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useCart } from "./cart.context";

const OrderCard: React.FC = () => {
  const { state } = useCart();
  let count = 0;
  state.items.map((item) => (count = count + item.amount));

  return (
    <>
      <Offcanvas
        className="bg-dark text-white"
        show={state.items.length > 0}
        placement="bottom"
        backdrop={false}
        scroll={true}
      >
        <Offcanvas.Header></Offcanvas.Header>
        <Offcanvas.Body>
          <Button variant="" className="material-icons p-0">
            add_shopping_cart
          </Button>
          {state.items.length} món {count} phần
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OrderCard;

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useCart } from "./cart.context";
import { useState } from "react";

function OrderCard() {
  const { state } = useCart();
  let count = 0;
  state.items.map((item) => (count = count + item.amount));

  return (
    <>
      <Offcanvas
        show={state.items.length > 0}
        placement="bottom"
        backdrop={false}
        scroll={true}
      >
        <Offcanvas.Header>
          <Button variant="" className="material-icons p-0">
            add_shopping_cart
          </Button>
          {state.items.length} món {count} phần
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}

export default OrderCard;

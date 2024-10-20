import { Button } from "react-bootstrap";
import AddToCartButton from "./AddToCartButton";
import { useCart } from "./cart.context";
import DecrementButton from "./DecrementButton";
import RemoveFromCartButton from "./RemoveFromCartButton";

interface IProps {
  selection: ICatalogPrice;
}

const Cart1: React.FC<IProps> = ({ selection }) => {
  const { state } = useCart();

  return (
    <>
      {state.items.map((item) => {
        if (item.item.id === selection.id) {
          if (item.amount === 1) {
            return (
              <div key={item.item.id}>
                <RemoveFromCartButton id={item.item.id.toString()} />
                <Button variant="outline-primary">{item.amount}</Button>
              </div>
            );
          } else {
            return (
              <div key={item.item.id}>
                <DecrementButton id={item.item.id.toString()} />
                <Button variant="outline-primary">{item.amount}</Button>
              </div>
            );
          }
        }
      })}
      <div>
        <AddToCartButton item={selection} selected={false} />
      </div>
    </>
  );
};

export default Cart1;

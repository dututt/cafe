// components/Cart.tsx

import { useCart } from "./cart.context";
import DecrementButton from "./DecrementButton";
import IncrementButton from "./IncrementButton";
import RemoveFromCartButton from "./RemoveFromCartButton";

const Cart: React.FC = () => {
  const { state } = useCart();

  return (
    <div>
      <ul>
        {state.items.map((item) => (
          <li key={item.item.id}>
            {item.item.content} - ${item.item.price} x {item.amount}
            <IncrementButton id={item.item.id.toString()} />
            <DecrementButton id={item.item.id.toString()} />
            <RemoveFromCartButton id={item.item.id.toString()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

// components/RemoveFromCartButton.tsx

import { Button } from "react-bootstrap";
import { useCart } from "./cart.context";

interface RemoveFromCartButtonProps {
  id: string;
}

const RemoveFromCartButton: React.FC<RemoveFromCartButtonProps> = ({ id }) => {
  const { dispatch } = useCart();

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <Button
      variant=""
      className="material-icons"
      onClick={handleRemoveFromCart}
    >
      remove_circle_outline
    </Button>
  );
};

export default RemoveFromCartButton;

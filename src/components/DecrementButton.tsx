import { Button } from "react-bootstrap";
import { useCart } from "./cart.context";

interface DecrementButtonProps {
  id: string;
}

const DecrementButton: React.FC<DecrementButtonProps> = ({ id }) => {
  const { dispatch } = useCart();

  const handleDecrement = () => {
    dispatch({ type: "DECREMENT_ITEM", payload: id });
  };

  return (
    <Button variant="" className="material-icons" onClick={handleDecrement}>
      remove_circle_outline
    </Button>
  );
};

export default DecrementButton;

import { useCart } from "./cart.context";

interface IncrementButtonProps {
  id: string;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ id }) => {
  const { dispatch } = useCart();

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT_ITEM", payload: id });
  };

  return <button onClick={handleIncrement}>+</button>;
};

export default IncrementButton;

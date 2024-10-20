import { useState } from "react";
import { useCart } from "./cart.context";
import { Button } from "react-bootstrap";

interface AddToCartButtonProps {
  item: ICatalogPrice;
  selected: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  item,
  selected,
}) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: { item, selected, amount: 1 } });
  };

  return (
    <Button variant="" onClick={handleAddToCart} className="material-icons">
      add_circle_outline
    </Button>
  );
};

export default AddToCartButton;

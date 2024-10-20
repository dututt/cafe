"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";

interface CartState {
  items: ISelection[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: ISelection }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREMENT_ITEM"; payload: string }
  | { type: "DECREMENT_ITEM"; payload: string };

const CardContext = createContext<
  { state: CartState; dispatch: React.Dispatch<CartAction> } | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.item.id === action.payload.item.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.item.id === action.payload.item.id
              ? { ...item, amount: item.amount + action.payload.amount }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.item.id.toString() !== action.payload
        ),
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.item.id.toString() === action.payload
            ? { ...item, amount: item.amount + 1 }
            : item
        ),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.item.id.toString() === action.payload && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("userCart must be used within a CartProvider");
  }
  return context;
};

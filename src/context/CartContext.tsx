import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { product } from "../types/Product.type";
import { sumProducts } from "../helpers/helper.js";
import useLocalstorage from "../hooks/useLocalstorage.js";

const CartContext = createContext({});

type cartProps = {
  selectedItems: product[];
  itemsCounter: number;
  total: number;
  checkout: boolean;
};

const initcart = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};
//
const CartReducer = (state: cartProps, action: any) => {
  switch (action.type) {
    case "load":
      return action.payload;
    case "add":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      return {
        selectedItems: [...state.selectedItems],
        ...sumProducts(state.selectedItems),
        checkout: false,
      };
    case "remove":
      const filterdItems = state.selectedItems.filter(
        (item) => item.id != action.payload.id
      );
      return {
        selectedItems: [...filterdItems],
        ...sumProducts(filterdItems),
        checkout: false,
      };
    case "increase":
      const incitem: product | undefined = state.selectedItems.find(
        (item) => item.id === action.payload.id
      );
      if (incitem) {
        incitem.quantity < 40 ? incitem.quantity++ : null;
      }
      return {
        selectedItems: [...state.selectedItems],
        ...sumProducts(state.selectedItems),
        checkout: false,
      };
    case "decrease":
      const decitem: product | undefined = state.selectedItems.find(
        (item) => item.id === action.payload.id
      );
      if (decitem) {
        decitem.quantity > 1 ? decitem.quantity-- : null;
      }
      return {
        selectedItems: [...state.selectedItems],
        ...sumProducts(state.selectedItems),
        checkout: false,
      };
    case "checkout":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: false,
      };
    default:
      throw new Error("Invalid Action...!!");
  }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer<any>(CartReducer, initcart);
  const [value, setValue] = useLocalstorage("cart", initcart);

  useEffect(() => {
    // @ts-ignore
    dispatch({ type: "load", payload: value });
  }, []);

  useEffect(() => {
    setValue(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

const useCart = () => {
  const { cart, dispatch } = useContext(CartContext) as any;
  return [cart, dispatch];
};

export { useCart };

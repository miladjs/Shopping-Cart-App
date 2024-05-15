import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { product } from "../types/Product.type";
import api from "./../services/config.js";

export const ProductContext = createContext<product[]>([]);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<product[]>([]);

  useEffect(() => {
    const productfetch = async () => {
      const response = await api.get("/products");
      setProduct(response);
    };
    productfetch();
  }, []);

  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

const useProduct = () => {
  const product = useContext(ProductContext);
  return product;
};

const useSingleProduct = (id: number) => {
  const products = useContext(ProductContext);
  const res = products.find((item) => item.id === id);
  return res;
};

export { useProduct, useSingleProduct };

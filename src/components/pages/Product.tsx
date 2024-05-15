import { useParams } from "react-router-dom";
import { useSingleProduct } from "../../context/ProductContext";
import ProductCard from "../shared/ProductCard";
import { product } from "../../types/Product.type";

const Product = () => {
  const { id } = useParams();

  const product = useSingleProduct(+id!);

  return <ProductCard product={product as product} />;
};

export default Product;

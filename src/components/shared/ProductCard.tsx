import AddToCart from "./AddToCart";
import { product } from "../../types/Product.type";

const ProductCard = ({ product }: { product: product }) => {
  return (
    <>
      <div className="grid md:grid-cols-[200px_1fr] grid-cols-1 gap-12 items-center p-10 border rounded-lg border-secondary">
        <img src={product?.image} alt={product?.title} />
        <div className="flex flex-col gap-20 p-4 justify-between h-full">
          <div className="ml-1">
            <h2 className="text-[30px] font-bold mb-2">{product?.title}</h2>
            <p>{product?.description}</p>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;

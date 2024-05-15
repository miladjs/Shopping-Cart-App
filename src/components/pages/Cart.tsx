import { useCart } from "../../context/CartContext";
import ProductCard from "../shared/ProductCard";
import { product } from "../../types/Product.type";

const Cart = () => {
  const [cart, dispatch] = useCart();

  return (
    <div className="grid md:grid-cols-[280px_1fr] grid-cols-1 gap-4 mt-3">
      <div className="cartDetail relative ">
        <ul className="bg-white text-primary p-8 rounded-lg border-dashed border border-secondary ">
          <li className="flex flex-col mb-2">
            <span>Total :</span>
            <b className="text-[18px] text-black">{cart.total.toFixed(2)} $</b>
          </li>
          <li className="flex flex-col mb-2">
            <span>Items :</span>
            <b className="text-[18px] text-black">
              {cart.selectedItems.length}
            </b>
          </li>
          <li className="flex flex-col mb-2">
            <span>Quantity :</span>
            <b className="text-[18px] text-black">{cart.itemsCounter}</b>
          </li>
          <li className="flex flex-col mb-2">
            <span>Status :</span>
            <b className="text-[18px] text-black">Pending...</b>
          </li>
          <button
            onClick={() => dispatch({ type: "checkout" })}
            className="bg-primary text-white py-3 px-6 rounded-lg w-full font-bold mt-6"
          >
            CheckOut
          </button>
        </ul>
      </div>
      <div className="cartlist gap-4 flex flex-col">
        {cart.selectedItems < 1 ? (
          <b className="bg-secondary text-primary py-3 px-5 rounded-lg text-center">
            Cart Empty !
          </b>
        ) : null}
        {cart.selectedItems.map((product: product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default Cart;

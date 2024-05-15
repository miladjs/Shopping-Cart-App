import { useCart } from "../../context/CartContext";
import { product } from "../../types/Product.type";
import { MdDeleteOutline } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

const AddToCart = ({ product }: { product: product }) => {
  const [cart, dispatch] = useCart();

  const current = cart.selectedItems.find(
    (item: product) => item.id === product.id
  );
  return (
    <div className="relative flex flex-row items-center w-full justify-between mt-14">
      {current?.quantity > 1 ? (
        <b className="absolute bottom-0 text-[20px]">
          {(current?.price * current?.quantity).toFixed(2)} $
        </b>
      ) : null}
      <b
        className={`text-[20px] relative bottom-0 ${
          current?.quantity > 1
            ? "line-through text-[13px] !bottom-5 text-gray"
            : null
        }`}
      >
        {product?.price} $
      </b>
      <div className="flex items-center gap-2.5">
        {current?.quantity == 1 ? (
          <button
            className="bg-secondary text-primary p-1.5 rounded-lg text-[22px]"
            onClick={() => dispatch({ type: "remove", payload: product })}
          >
            <MdDeleteOutline />
          </button>
        ) : null}

        {current?.quantity > 1 ? (
          <button
            className="bg-secondary text-primary p-1.5 rounded-lg text-[22px]"
            onClick={() => dispatch({ type: "decrease", payload: product })}
          >
            <FiMinus />
          </button>
        ) : null}

        <span className="  rounded-lg text-[18px] font-bold ">
          {current?.quantity}
        </span>

        {current?.quantity > 0 ? (
          <button
            className="bg-primary text-secondary p-1.5 rounded-lg text-[22px]"
            onClick={() => dispatch({ type: "increase", payload: product })}
          >
            <FiPlus />
          </button>
        ) : null}

        {current?.quantity ? null : (
          <button
            className="bg-primary text-secondary p-1.5 rounded-lg text-[22px]"
            onClick={() => dispatch({ type: "add", payload: product })}
          >
            <PiShoppingCartSimpleBold />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToCart;

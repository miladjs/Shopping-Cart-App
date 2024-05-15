import { PiShoppingCartSimple } from "react-icons/pi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext.js";
import { useQuery } from "../../context/QueryContext.js";
import { useEffect, useState } from "react";

const Header = () => {
  const [cart] = useCart();
  const [query, setQuery] = useQuery();
  const [search, setSearch] = useState<string>("");
  const setSearchParams = useSearchParams()[1];

  const navigate = useNavigate();

  useEffect(() => {
    if (search?.length < 2) {
      setQuery((prev: any) => {
        delete prev?.search;
        return prev;
      });
    } else {
      setQuery((prev: any) => {
        return { ...prev, search };
      });
    }
    setSearchParams(new URLSearchParams(query));
  }, [search]);

  useEffect(() => {
    setSearchParams(new URLSearchParams(query));
  }, [query]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border p-8 mb-6 rounded-lg border-secondary gap-5 md:gap-0">
      <div
        className="text-primary text-[18px] uppercase cursor-pointer"
        onClick={() => navigate("/")}
      >
        <b>Shopping Cart + TS</b>
      </div>
      <div className="flex flex-row">
        <div className="navmenu">
          <input
            className="bg-secondary py-2 px-4 rounded-lg placeholder:text-primary text-primary outline-none"
            type="text"
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            value={search}
            placeholder="Search Products"
          />
        </div>
        <div
          onClick={() => navigate("/cart")}
          className="cart cursor-pointer flex flex-row bg-primary text-white items-center px-2 py-1  rounded-xl ml-4"
        >
          <b className="m-1">{cart?.itemsCounter}</b>
          <PiShoppingCartSimple className="size-5 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default Header;

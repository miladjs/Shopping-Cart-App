import { product } from "../../types/Product.type";
import { useProduct } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "./../../services/config.js";
import {
  filterSearchProduct,
  filterCategoryProduct,
} from "./../../helpers/helper.js";
import { TbCategory2 } from "react-icons/tb";
import { useQuery } from "../../context/QueryContext.js";
import AddToCart from "../shared/AddToCart.js";

const Home = () => {
  const products: product[] = useProduct();
  const [categorys, setCategorys] = useState([]);
  const [query, setQuery] = useQuery();
  const [displayproducts, setDisplayproducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const Searchparam = searchParams.get("search");
  const categoryparam = searchParams.get("category");

  useEffect(() => {
    const categoryFetch = async () => {
      const res = await api.get("/products/categories");
      setCategorys(res);
    };
    categoryFetch();
  }, []);

  useEffect(() => {
    setDisplayproducts(products as any);
  }, [products]);

  useEffect(() => {
    let SearchedProduct = filterSearchProduct(products, Searchparam);
    let categoryProduct = filterCategoryProduct(SearchedProduct, categoryparam);
    setDisplayproducts(categoryProduct);
  }, [Searchparam, categoryparam]);

  const queryHandler = (item) => {
    if (item === "all") {
      setQuery((prev) => {
        if (prev && prev.category) {
          const { category, ...rest } = prev;
          return rest as any;
        }
        return prev;
      });
    } else {
      setQuery((prev) => {
        return { ...prev, category: item } as any;
      });
    }
    setSearchParams(query);
  };

  return (
    <div className="mt-6 flex flex-col">
      <h3 className="text-2xl mb-5 font-bold flex justify-center">
        Product List
      </h3>
      <div className="grid md:grid-cols-[200px_1fr] grid-rows-1 md:gap-10">
        <div>
          <b className="text-[18px] mb-4 rounded-lg w-full flex font-medium items-center">
            <TbCategory2 className="mr-2" />
            <span>categories</span>
          </b>
          <ul className="bg-secondary p-4 rounded-lg">
            <li
              className=" hover:bg-white p-3 rounded-md cursor-pointer"
              onClick={() => queryHandler("all")}
            >
              All Categorys
            </li>
            {categorys.map((item) => (
              <li
                className=" hover:bg-white p-3 rounded-md cursor-pointer"
                key={item}
                onClick={() => queryHandler(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 grid-rows-1 md:mt-0 mt-10 gap-6">
          {displayproducts.length < 1 ? "loading..." : null}
          {displayproducts.map((item: product) => {
            return <Product key={item.id} product={item as product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

const Product = ({ product }: { product: product }) => {
  const [cart] = useCart();
  const navigate = useNavigate();

  cart?.selectedItems?.find((item: product) => item.id === product.id);

  return (
    <div className="border border-secondary p-8 rounded-lg flex flex-col justify-center items-center">
      <img
        src={product.image}
        alt={product.title}
        className="h-56 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <h2
        className="mt-6 font-bold text-center cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {product.title}
      </h2>
      <AddToCart product={product} />
    </div>
  );
};

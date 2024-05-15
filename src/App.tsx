import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import { Route, Routes } from "react-router-dom";
import Product from "./components/pages/Product";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/product/:id" element={<Product />} />
  </Routes>
);

export default App;

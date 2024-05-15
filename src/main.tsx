import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.scss";
import Layout from "./components/layout/Layout.tsx";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./context/ProductContext.tsx";
import CartProvider from "./context/CartContext.tsx";
import { QueryProvider } from "./context/QueryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <App />
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  </QueryProvider>
);

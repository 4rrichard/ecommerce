import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import { Login } from "./components/Login";
import NavBar from "./components/NavBar";
import ProductPage from "./components/ProductPage";
import Products from "./components/Products";
import Register from "./components/Register";

export const ProductContext = createContext();

function App() {
  const [selectedProduct, setSelectedProduct] = useState(
    () => JSON.parse(localStorage.getItem("user2")) ?? "[]"
  );
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("user2");
    setSelectedProduct(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("user2", [JSON.stringify(selectedProduct)]);
  }, [selectedProduct]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setAllProducts(json);
      });
  }, []);

  return (
    <ProductContext.Provider
      value={{ selectedProduct, setSelectedProduct, allProducts }}
    >
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/register" element={<Register />} />

          <Route path="/products/:productName" element={<ProductPage />} />
        </Routes>
      </div>
    </ProductContext.Provider>
  );
}

export default App;

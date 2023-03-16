import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import { Login } from "./components/Login";
import NavBar from "./components/NavBar";
import ProductPage from "./components/ProductPage";
import Products from "./components/Products";
import Register from "./components/Register";
import Favorites from "./components/Favorites";

export const ProductContext = createContext();

function App() {
  const [selectedProduct, setSelectedProduct] = useState(
    () => JSON.parse(localStorage.getItem("user2")) ?? "[]"
  );

  const [userFav, setUserFav] = useState(
    () => JSON.parse(localStorage.getItem("userFavs")) ?? "[]"
  );

  const [allProducts, setAllProducts] = useState([]);
  const [selectedProductPage, setSelectedProductPage] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setAllProducts(json);
      });
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("user2");
    setSelectedProduct(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("user2", [JSON.stringify(selectedProduct)]);
  }, [selectedProduct]);

  useEffect(() => {
    const data = localStorage.getItem("userFavs");
    setUserFav(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("userFavs", [JSON.stringify(userFav)]);
  }, [userFav]);

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        allProducts,
        selectedProductPage,
        setSelectedProductPage,
        userFav,
        setUserFav,
      }}
    >
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/products/:productName" element={<ProductPage />} />
        </Routes>
      </div>
    </ProductContext.Provider>
  );
}

export default App;

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
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const ProductContext = createContext();

function App() {
  const [user] = useAuthState(auth);

  const [selectedProduct, setSelectedProduct] = useState(() => {
    if (user) {
      return JSON.parse(localStorage.getItem(user.uid)) ?? "[]";
    } else {
      return JSON.parse(localStorage.getItem("guest")) ?? "[]";
    }
  });

  const [userFav, setUserFav] = useState(() => {
    if (user) {
      return JSON.parse(localStorage.getItem(`${user.uid}Favs`)) ?? "[]";
    } else {
      return JSON.parse(localStorage.getItem("guestFavs")) ?? "[]";
    }
  });

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
    const data = user
      ? localStorage.getItem(user.uid)
      : localStorage.getItem("guest");

    setSelectedProduct(JSON.parse(data));
  }, []);

  useEffect(() => {
    user
      ? localStorage.setItem(user.uid, [JSON.stringify(selectedProduct)])
      : localStorage.setItem("guest", [JSON.stringify(selectedProduct)]);
  }, [selectedProduct]);

  useEffect(() => {
    const data = user
      ? localStorage.getItem(`${user.uid}Favs`)
      : localStorage.getItem("guestFavs");
    setUserFav(JSON.parse(data));
  }, []);

  useEffect(() => {
    user
      ? localStorage.setItem(`${user.uid}Favs`, [JSON.stringify(userFav)])
      : localStorage.setItem("guestFavs", [JSON.stringify(userFav)]);
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

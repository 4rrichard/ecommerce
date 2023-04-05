import { createContext, useState, useEffect } from "react";

import { auth } from "../firebase";

import { useAuthState } from "react-firebase-hooks/auth";

export const ProductContext = createContext();

const ContextProvider = ({ children }) => {
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
      return JSON.parse(localStorage.getItem(`${user.uid}Favs`)) ?? [];
    } else {
      return JSON.parse(localStorage.getItem("guestFavs")) ?? [];
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
  }, [user]);

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
  }, [user]);

  useEffect(() => {
    user
      ? localStorage.setItem(`${user.uid}Favs`, [JSON.stringify(userFav)])
      : localStorage.setItem("guestFavs", [JSON.stringify(userFav)]);
  }, [userFav]);

  useEffect(() => {
    if (
      !Object.keys(localStorage).includes("guest") ||
      localStorage.guest === null
    ) {
      localStorage.setItem("guest", JSON.stringify([]));
    }
    if (
      !Object.keys(localStorage).includes("guestFavs") ||
      localStorage.guestFavs === null
    ) {
      localStorage.setItem("guestFavs", JSON.stringify([]));
    }
  }, []);

  console.log(localStorage.guest);

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
      {children}
    </ProductContext.Provider>
  );
};

export default ContextProvider;

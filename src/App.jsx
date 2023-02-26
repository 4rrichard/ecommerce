import { createContext, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Products from "./components/Products";

export const ProductContext = createContext();

function App() {
  const [selectedProduct, setSelectedProduct] = useState(
    () => JSON.parse(localStorage.getItem("user")) ?? "[]"
  );

  useEffect(() => {
    const data = localStorage.getItem("user");
    setSelectedProduct(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("user", [JSON.stringify(selectedProduct)]);
  }, [selectedProduct]);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      <div className="App">
        <NavBar />
        <Products selectedProduct={selectedProduct} />
      </div>
    </ProductContext.Provider>
  );
}

export default App;

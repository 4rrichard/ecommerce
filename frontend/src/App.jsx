import { Route, Routes } from "react-router-dom";

import Cart from "./components/Cart";
import { Login } from "./components/Login";
import NavBar from "./components/NavBar";
import ProductPage from "./components/ProductPage";
import Products from "./components/Products";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="/products/:productName" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;

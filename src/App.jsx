import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen pt-20">
        <Navbar cartItems={cartItems} /> {/* CHANGE */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <Products cartItems={cartItems} setCartItems={setCartItems} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/checkout"
              element={<Checkout setCartItems={setCartItems} />}
            />{" "}
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </BrowserRouter>
  );
}

export default App;

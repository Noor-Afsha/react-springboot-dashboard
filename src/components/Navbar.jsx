import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/chutney logo.png";

function Navbar({ cartItems }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // SAFE cart count
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
  return (
    <nav className="bg-green-700 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Ghar Ki Chutney Logo"
            className="w-10 h-10 object-contain"
          />

          <span className="text-xl font-bold text-white">Ghar Ka Zaika</span>
        </Link>

        {/* Hamburger */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* Menu */}
        <div
          className={`flex flex-col md:flex-row md:items-center gap-6 font-medium absolute md:static bg-green-700 left-0 w-full md:w-auto px-6 md:px-0 py-4 md:py-0 transition-all duration-300 ${
            menuOpen ? "top-16" : "-top-96"
          }`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            Products
          </Link>
          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative hover:text-yellow-300 transition"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            About
          </Link>
          <Link
            to="/my-orders"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            My Orders
          </Link>
          <Link
            to="/admin-orders"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

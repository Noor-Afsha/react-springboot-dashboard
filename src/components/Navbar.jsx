import { Link } from "react-router-dom";
import logo from "../assets/chutney logo.png";
function Navbar() {
  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Ghar Ki Chutney Logo"
            className="w-10 h-10 object-contain"
          />

          <span className="text-xl font-bold text-white">Ghar Ki Chutney</span>
        </Link>

        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-yellow-300 transition">
            Products
          </Link>

          <Link to="/cart" className="hover:text-yellow-300 transition">
            Cart
          </Link>

          <Link to="/about" className="hover:text-yellow-300 transition">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

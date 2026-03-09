import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { ShoppingCart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-10 py-12 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-4">Chutney Store</h2>
          <p className="text-gray-400">
            Authentic homemade Indian chutneys prepared fresh using traditional
            recipes.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Help Center</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <p className="text-gray-400">Lucknow, India</p>
          <p className="text-gray-400">support@chutney.com</p>

          {/* Social Media Icons */}

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-green-400">
              <Facebook size={20} />
            </a>

            <a href="#" className="hover:text-green-400">
              <Instagram size={20} />
            </a>

            <a href="#" className="hover:text-green-400">
              <Twitter size={20} />
            </a>

            <a
              href="mailto:support@chutney.com"
              className="hover:text-green-400"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 Chutney Store
      </div>
    </footer>
  );
}

export default Footer;

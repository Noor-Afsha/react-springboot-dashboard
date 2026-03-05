import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-green-700 text-white px-10 py-4 flex justify-between items-center">

      <div className=" flex gap-8 text-lg">

        <Link to="/" className="hover:text-orange-300">Home</Link>

        <Link to="/products" className="hover:text-orange-300">Products</Link>

        <Link to="/cart" className="hover:text-orange-300">Cart</Link>
        <Link to="/about" className="hover:text-orange-300">About</Link>


      </div>

    </div>
  );
}

export default Navbar;
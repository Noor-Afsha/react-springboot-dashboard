import { Link } from "react-router-dom";

function Cart() {

  return (

    <div className="min-h-screen bg-gray-50 py-16 px-10">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-10 text-center">

        <h1 className="text-3xl font-bold text-green-700">
          Your Cart
        </h1>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="empty cart"
          className="w-40 mx-auto mt-8 opacity-80"
        />

        <p className="text-gray-600 mt-6 text-lg">
          Your cart is currently empty.
        </p>

        <p className="text-gray-500 mt-2">
          Looks like you haven't added any chutneys yet.
        </p>

        <Link
          to="/products"
          className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Explore Products
        </Link>

      </div>

    </div>

  );

}

export default Cart;
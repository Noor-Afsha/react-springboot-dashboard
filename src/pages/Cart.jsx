import { useEffect, useState } from "react";
import { getCart, removeCartItem, updateCartQuantity } from "../api/cartApi";
import { Link } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data || []);
    } catch (error) {
      console.error("Failed to load cart", error);
    } finally {
      setLoading(false);
    }
  };

  // Increase Quantity
  const increaseQty = async (item) => {
    const newQty = item.quantity + 1;

    try {
      await updateCartQuantity(item.id, newQty);

      setCartItems((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, quantity: newQty } : p)),
      );
    } catch (error) {
      console.error("Failed to increase quantity");
    }
  };

  // Decrease Quantity
  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;

    const newQty = item.quantity - 1;

    try {
      await updateCartQuantity(item.id, newQty);

      setCartItems((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, quantity: newQty } : p)),
      );
    } catch (error) {
      console.error("Failed to decrease quantity");
    }
  };

  // Remove item
  const removeItem = async (id) => {
    try {
      await removeCartItem(id);

      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item");
    }
  };

  // Cart Total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg">Loading cart...</p>
      </div>
    );
  }

  // Empty Cart UI
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          className="w-40 mb-6"
        />

        <h2 className="text-2xl font-semibold">Your cart is empty</h2>

        <p className="text-gray-500 mt-2">
          Add some delicious chutneys to your cart
        </p>

        <a
          href="/products"
          className="mt-5 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-white shadow-md rounded-xl p-5 mb-5"
        >
          <div className="flex items-center gap-5">
            <img src={item.image} className="w-20 h-20 object-cover rounded" />

            <div>
              <h2 className="font-semibold text-lg">{item.name}</h2>

              <p className="text-green-700 font-bold">₹{item.price}</p>

              <p className="text-gray-500">
                Subtotal ₹{item.price * item.quantity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={item.quantity <= 1}
              onClick={() => decreaseQty(item)}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-40"
            >
              -
            </button>

            <span className="font-semibold">{item.quantity}</span>

            <button
              onClick={() => increaseQty(item)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              +
            </button>

            <button
              onClick={() => removeItem(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-10 text-2xl font-bold">Total ₹{total}</div>

      <Link
        to="/checkout"
        state={{ cartItems, total }}
        className="bg-green-600 text-white px-6 py-3 rounded mt-4 inline-block"
      >
        Checkout
      </Link>
    </div>
  );
}

export default Cart;

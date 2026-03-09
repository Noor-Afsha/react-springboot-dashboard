import { addToCart } from "../api/cartApi";
import { toast } from "react-toastify";

function ProductCard({ product, cartItems = [], setCartItems }) {
  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);

      // Check if product already exists in cart
      const existingItem = cartItems.find((item) => item.id === product.id);

      let updatedCart;

      if (existingItem) {
        // Increase quantity
        updatedCart = cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new item
        updatedCart = [...cartItems, { ...product, quantity: 1 }];
      }

      setCartItems(updatedCart);

      toast.success("Item added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition hover:-translate-y-1">
      <img
        src={product.image}
        className="h-48 w-full object-cover rounded-t-xl"
      />

      <div className="p-5">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-green-700 font-bold mt-2">₹{product.price}</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

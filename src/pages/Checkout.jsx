import { useState } from "react";
import { placeOrder } from "../api/orderApi";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout({ setCartItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];
  const cartTotal = location.state?.total || 0;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    country: "India",
    addressType: "home",
  });

  const [loading, setLoading] = useState(false);

  // ⭐ prevent duplicate order creation
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentProcessing) return; // ⭐ prevent double click

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!form.name || !form.phone || !form.address || !form.email) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    setPaymentProcessing(true); // ⭐ mark processing

    const orderData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      country: form.country,
      totalAmount: cartTotal,
      items: cartItems.map((item) => ({
        productId: item.productId || item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await placeOrder(orderData);

      const order = response.data || response;

      const options = {
        key: "rzp_test_SPT7KXU2VmvgIA", // razor pay key
        amount: order.totalAmount * 100,
        currency: "INR",
        name: "Ghar Ka Zaika",
        description: "Chutney Order Payment",
        order_id: order.razorpayOrderId,

        handler: async function (paymentResponse) {
          try {
            await fetch(
              "https://chutney-backend-service-5.onrender.com/api/orders/verify", //for deployment
              // "http://localhost:8080/api/orders/verify",  //for testing
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentResponse),
              },
            );

            toast.success("Payment Successful 🎉");

            setCartItems([]);

            navigate("/order-success", {
              state: {
                order: order,
                cartItems: cartItems,
              },
            });
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#16a34a",
        },

        modal: {
          ondismiss: function () {
            // ⭐ user closed payment popup
            toast.error("Payment cancelled");
            setPaymentProcessing(false);
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      // ⭐ Payment Failure Handler
      rzp.on("payment.failed", function (response) {
        console.error(response.error);

        toast.error("Payment failed: " + response.error.description);

        setPaymentProcessing(false);
        setLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");

      setPaymentProcessing(false);
      setLoading(false);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Checkout
        </h1>

        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-3">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="border-t mt-3 pt-3 font-semibold flex justify-between">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="addressType"
                value="home"
                checked={form.addressType === "home"}
                onChange={handleChange}
              />
              Residential Address
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="addressType"
                value="office"
                checked={form.addressType === "office"}
                onChange={handleChange}
              />
              Office Address
            </label>
          </div>

          <button
            disabled={loading || paymentProcessing}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Processing Payment..." : "Pay & Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

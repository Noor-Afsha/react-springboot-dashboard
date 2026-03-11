import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const phone = localStorage.getItem("userPhone");

  useEffect(() => {
    if (!phone) return;

    axios
      .get(`/orders/orders/${phone}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [phone]);

  return (
    <div className="min-h-screen bg-orange-50 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
          My Orders
        </h1>

        {!phone && (
          <p className="text-center text-gray-600">
            Please place an order first.
          </p>
        )}

        {orders.length === 0 && phone && (
          <p className="text-center text-gray-600">No Orders Found</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-gray-700">
                Order #{order.id}
              </div>

              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
                {order.status}
              </span>
            </div>

            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Name:</span> {order.name}
              </p>

              <p>
                <span className="font-semibold">Address:</span> {order.address}
              </p>

              <p className="text-lg font-bold text-orange-600 mt-2">
                ₹{order.totalAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;

import { useState, useEffect } from "react";
import api from "../api/api";
import OrderTracker from "../components/OrderTracker";
import DeliveryMap from "../components/DeliveryMap";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [trackOrderId, setTrackOrderId] = useState(null);

  const phone = localStorage.getItem("userPhone");

  useEffect(() => {
    if (!phone) return;

    api
      .get(`/orders/${phone}`)
      .then((res) => {
        console.log("Orders API Response:", res.data);

        setOrders(res.data); // IMPORTANT FIX
      })
      .catch((err) => {
        console.error("Order fetch error:", err);
      });
  }, [phone]);

  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  const cancelOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/cancel`);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">🧾 My Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-500">No orders found</p>
        )}

        {orders.map((order) => {
          const isOpen = openOrderId === order.id;
          const isTracking = trackOrderId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow mb-6 overflow-hidden"
            >
              {/* BASIC INFO */}

              <div
                onClick={() => toggleOrder(order.id)}
                className="cursor-pointer flex justify-between items-center p-6 hover:bg-gray-50"
              >
                <div>
                  <p className="text-gray-400 text-sm">Order #{order.id}</p>

                  <p className="font-semibold text-gray-800">{order.status}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-orange-600">
                    ₹{order.totalAmount}
                  </p>

                  <p className="text-xs text-gray-400">
                    Click to {isOpen ? "close" : "view"} details
                  </p>
                </div>
              </div>

              {/* DETAILS */}

              {isOpen && (
                <div className="p-6 border-t">
                  <p className="text-gray-500 mb-6">📍 {order.address}</p>

                  <OrderTracker order={order} />

                  {/* BUTTONS */}

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelOrder(order.id);
                      }}
                      className="bg-red-500 text-white px-5 py-2 rounded-lg"
                    >
                      Cancel Order
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTrackOrderId(isTracking ? null : order.id);
                      }}
                      className="bg-blue-500 text-white px-5 py-2 rounded-lg"
                    >
                      {isTracking ? "Hide Map" : "Track Order"}
                    </button>

                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="bg-gray-800 text-white px-5 py-2 rounded-lg"
                    >
                      Invoice
                    </button>
                  </div>

                  {/* MAP */}

                  {isTracking && (
                    <DeliveryMap
                      driverLocation={[
                        order.driverLat || 26.8467,
                        order.driverLng || 80.9462,
                      ]}
                      destination={[
                        order.customerLat || 26.85,
                        order.customerLng || 80.949,
                      ]}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

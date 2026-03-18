import { useState, useEffect } from "react";
import api from "../api/api";
import OrderTracker from "../components/OrderTracker";
import DeliveryMap from "../components/DeliveryMap";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [trackOrderId, setTrackOrderId] = useState(null);

  const [invoiceData, setInvoiceData] = useState(null);

  // ✅ NEW STATES
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const phone = localStorage.getItem("userPhone");

  useEffect(() => {
    if (!phone) return;

    api
      .get(`/orders/${phone}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Order fetch error:", err);
      });
  }, [phone]);

  const toggleOrder = (id) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  // ✅ UPDATED CANCEL FUNCTION
  const cancelOrder = async () => {
    if (!cancelReason.trim()) {
      setErrorMsg("Please enter cancel reason");
      return;
    }

    try {
      await api.put(`/orders/${cancelOrderId}/cancel`);

      setOrders((prev) =>
        prev.map((o) =>
          o.id === cancelOrderId ? { ...o, status: "CANCELLED" } : o,
        ),
      );

      setCancelOrderId(null);
      setCancelReason("");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInvoice = async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}/invoice`);
      setInvoiceData(res.data.data || res.data);
    } catch (err) {
      console.error("Invoice error:", err);
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
                </div>
              </div>

              {isOpen && (
                <div className="p-6 border-t">
                  <p className="text-gray-500 mb-6">📍 {order.address}</p>

                  <OrderTracker order={order} />

                  <div className="flex gap-4 mt-8">
                    {/* ✅ CANCEL BUTTON WITH 24H CHECK */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        const orderTime = new Date(order.createdAt);
                        const now = new Date();
                        const diffHours = (now - orderTime) / (1000 * 60 * 60);

                        if (diffHours > 24) {
                          setErrorMsg(
                            "Order can only be cancelled within 24 hours",
                          );
                          return;
                        }

                        setCancelOrderId(order.id);
                      }}
                      className="bg-red-500 text-white px-5 py-2 rounded-lg"
                    >
                      Cancel Order
                    </button>

                    {/* TRACK */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTrackOrderId(isTracking ? null : order.id);
                      }}
                      className="bg-blue-500 text-white px-5 py-2 rounded-lg"
                    >
                      {isTracking ? "Hide Map" : "Track Order"}
                    </button>

                    {/* INVOICE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        fetchInvoice(order.id);
                      }}
                      className="bg-gray-800 text-white px-5 py-2 rounded-lg"
                    >
                      Invoice
                    </button>
                  </div>

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

      {/* ✅ CANCEL POPUP */}
      {cancelOrderId && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4">Cancel Order</h2>

            <textarea
              placeholder="Enter reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCancelOrderId(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>

              <button
                onClick={cancelOrder}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ INVOICE POPUP */}
      {invoiceData && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setInvoiceData(null)}
              className="absolute top-3 right-3 text-red-500 font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Invoice</h2>

            <p>
              <b>Order ID:</b> {invoiceData.id}
            </p>
            <p>
              <b>Name:</b> {invoiceData.name}
            </p>
            <p>
              <b>Status:</b> {invoiceData.status}
            </p>
            <p>
              <b>Total:</b> ₹{invoiceData.totalAmount}
            </p>
            <p>
              <b>Address:</b> {invoiceData.address}
            </p>
          </div>
        </div>
      )}

      {/* ✅ ERROR MESSAGE */}
      {errorMsg && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow">
          {errorMsg}
          <button onClick={() => setErrorMsg("")} className="ml-3 font-bold">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

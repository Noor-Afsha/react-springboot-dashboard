import { useEffect, useState } from "react";
import api from "../api/api";

const steps = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const phone = localStorage.getItem("userPhone");

  useEffect(() => {
    if (!phone) return;

    api
      .get(`/orders/${phone}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [phone]);

  const getStepIndex = (status) => {
    return steps.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-orange-50 py-16">
      <div className="max-w-4xl mx-auto">
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

        {orders.map((order) => {
          const currentStep = getStepIndex(order.status);

          return (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100"
            >
              {/* ORDER HEADER */}

              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold text-gray-700">
                  Order #{order.id}
                </div>

                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
                  {order.status}
                </span>
              </div>

              {/* ORDER DETAILS */}

              <div className="space-y-1 text-gray-600 mb-6">
                <p>
                  <span className="font-semibold">Name:</span> {order.name}
                </p>

                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {order.address}
                </p>

                <p className="text-lg font-bold text-orange-600 mt-2">
                  ₹{order.totalAmount}
                </p>
              </div>

              {/* ORDER TRACKING STEPS */}

              <div className="flex items-center justify-between mt-6">
                {steps.map((step, index) => {
                  const active = index <= currentStep;

                  return (
                    <div
                      key={step}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                          active ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <p className="text-xs mt-2 text-center">
                        {step.replaceAll("_", " ")}
                      </p>

                      {index !== steps.length - 1 && (
                        <div
                          className={`h-1 w-full ${
                            index < currentStep ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;

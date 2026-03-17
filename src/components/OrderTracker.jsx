import { useState } from "react";

const steps = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export default function OrderTracker({ order }) {
  const currentStep = steps.indexOf(order.status);
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="relative mt-10 mb-10">
      {/* Background line */}

      <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200"></div>

      {/* Progress line */}

      <div
        className="absolute top-5 left-5 h-1 bg-green-500 transition-all duration-700"
        style={{ width: `calc(${progress}% - 10px)` }}
      ></div>

      {/* Moving Truck */}

      <div
        className="absolute text-2xl truck-animation z-20"
        style={{
          left: `${progress}%`,
          top: "-18px",
          transform: "translateX(-50%)",
        }}
      >
        🚚
      </div>

      {/* Steps */}

      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const active = index <= currentStep;

          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  active ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>

              <p className="text-xs mt-2 w-20 text-center">
                {step.replaceAll("_", " ")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

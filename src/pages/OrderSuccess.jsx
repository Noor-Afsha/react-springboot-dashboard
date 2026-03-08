import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";

function OrderSuccess() {
  const location = useLocation();

const order = location.state?.order?.data || location.state?.order;
  const items = location.state?.cartItems || [];

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No order found</p>
      </div>
    );
  }
const downloadReceipt = () => {

  const doc = new jsPDF();
  const img = new Image();
  img.src = "/download.png";

  img.onload = () => {

    doc.addImage(img, "PNG", 70, 10, 70, 40);

    doc.setFontSize(18);
    doc.text("GHAR KI CHUTNEY", 80, 60);

    doc.setFontSize(14);
    doc.text("Order Receipt", 90, 70);

    doc.setFontSize(12);

    let y = 90;

    doc.text(`Order ID: ${order?.id || "-"}`, 20, y);
    y += 10;

    doc.text(`Customer: ${order?.name || "-"}`, 20, y);
    y += 10;

    doc.text(`Phone: ${order?.phone || "-"}`, 20, y);
    y += 10;

    doc.text(`Address: ${order?.address || "-"}`, 20, y);
    y += 20;

    doc.text("Items:", 20, y);
    y += 10;

    items.forEach((item) => {

      doc.text(
        `${item.name || "Product"} x ${item.quantity} - ₹${item.price * item.quantity}`,
        20,
        y
      );

      y += 10;

    });

    doc.text(`Total Amount: ₹${order?.totalAmount || 0}`, 20, y + 10);
    doc.save(`order-${order?.id}.pdf`);
  };

};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-lg w-full">
        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for ordering from Ghar Ki Chutney
        </p>

        <div className="mt-6 text-left">
          <p className="font-semibold">Order ID: #{order?.id}</p>

          <p>Customer: {order?.name}</p>

          <p>Total Amount: ₹{order?.totalAmount}</p>

          <p>Status: {order?.status || "Pending"}</p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="font-semibold mb-2">Ordered Items</h2>

          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>
                {item.name || "Product"} × {item.quantity}
              </span>

              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Link
            to="/products"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>

          <button
            onClick={downloadReceipt}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
export default OrderSuccess;

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // ✅ FIXED BASE URL (IMPORTANT)
  const API_BASE_URL = "http://localhost:8080/api/admin";

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/orders`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        // ✅ FIX: handle both formats
        setOrders(data.data || data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order)),
      );
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // Chart data
  const dailyData = {};
  orders.forEach((order) => {
    const date = order.createdAt?.split("T")[0] || "Unknown";
    if (!dailyData[date]) dailyData[date] = { date, orders: 0, revenue: 0 };
    dailyData[date].orders += 1;
    dailyData[date].revenue += order.totalAmount || 0;
  });
  const chartData = Object.values(dailyData);

  // Pie data
  const statusCount = {
    PLACED: 0,
    CONFIRMED: 0,
    SHIPPED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
    OUTOFDELIVERY: 0,
  };

  orders.forEach((o) => {
    if (statusCount[o.status] !== undefined) {
      statusCount[o.status]++;
    }
  });

  const pieData = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  const COLORS = [
    "#FBBF24",
    "#3B82F6",
    "#8B5CF6",
    "#22C55E",
    "#EF4444",
    "#10B981",
  ];

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0,
  );

  // Pagination
  const indexLast = currentPage * ordersPerPage;
  const indexFirst = indexLast - ordersPerPage;
  const currentOrders = orders.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const statusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "SHIPPED":
        return "bg-purple-100 text-purple-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "OUTOFDELIVERY":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Orders Dashboard</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <p>Total Orders</p>
            <h2 className="text-2xl font-bold">{orders.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p>Total Revenue</p>
            <h2 className="text-2xl font-bold text-green-600">
              ₹{totalRevenue}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p>Status Summary</p>
            <h2 className="text-2xl font-bold">
              {Object.values(statusCount).reduce((a, b) => a + b, 0)}
            </h2>
          </div>
        </div>

        {/* CHART */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="font-semibold mb-4">Daily Orders & Revenue</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#3b82f6" />
              <Line type="monotone" dataKey="revenue" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="font-semibold mb-4">Order Status</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Update</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3 font-semibold">#{order.id}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    ₹{order.totalAmount}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full ${statusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <select
                      value={order.status}
                      className="border p-2 rounded"
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="PLACED">PLACED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="OUTOFDELIVERY">OUTOFDELIVERY</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-center gap-3 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

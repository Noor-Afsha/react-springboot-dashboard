// import { useEffect, useState } from "react";
// import { getAllOrders, updateOrderStatus } from "/api/adminApi";

// function AdminOrders() {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = () => {
//     getAllOrders()
//       .then((res) => {
//         setOrders(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const changeStatus = (id, status) => {
//     updateOrderStatus(id, status).then(() => {
//       fetchOrders(); // refresh list
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-3xl font-bold mb-8 text-center">Admin Orders</h1>

//       <div className="max-w-5xl mx-auto">
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="bg-white shadow-md rounded-lg p-6 mb-4"
//           >
//             <div className="flex justify-between mb-3">
//               <span className="font-semibold">Order #{order.id}</span>

//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </div>

//             <p>Name: {order.name}</p>
//             <p>Phone: {order.phone}</p>
//             <p>Total: ₹{order.totalAmount}</p>

//             <div className="mt-4 flex gap-3">
//               <button
//                 onClick={() => changeStatus(order.id, "PREPARING")}
//                 className="bg-yellow-500 text-white px-4 py-1 rounded"
//               >
//                 Preparing
//               </button>

//               <button
//                 onClick={() => changeStatus(order.id, "SHIPPED")}
//                 className="bg-blue-500 text-white px-4 py-1 rounded"
//               >
//                 Shipped
//               </button>

//               <button
//                 onClick={() => changeStatus(order.id, "DELIVERED")}
//                 className="bg-green-600 text-white px-4 py-1 rounded"
//               >
//                 Delivered
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminOrders;

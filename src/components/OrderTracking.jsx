import { useEffect, useState } from "react";

function OrderTracking({orderId}){

  const [tracking,setTracking] = useState([]);

  useEffect(()=>{

    fetch(`http://localhost:8080/api/orders/${orderId}/tracking`)
      .then(res => res.json())
      .then(data => setTracking(data));

  },[orderId]);

  return(

    <div className="bg-white p-6 rounded-lg shadow mt-6">

      <h3 className="text-xl font-semibold mb-4">
        Order Tracking
      </h3>

      {tracking.map((step,index)=>(
        
        <div key={index} className="flex items-center mb-4">

          <div className="w-4 h-4 bg-green-500 rounded-full"></div>

          <div className="ml-4">

            <p className="font-medium">{step.status}</p>

            <p className="text-gray-500 text-sm">
              {new Date(step.updatedAt).toLocaleString()}
            </p>

          </div>

        </div>

      ))}

    </div>

  )

}

export default OrderTracking;
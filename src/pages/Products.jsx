// import ProductCard from "../components/ProductCard";

// const products = [
//   {
//     id: 1,
//     name: "Mango Chutney",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7"
//   },
//   {
//     id: 2,
//     name: "Garlic Chutney",
//     price: 100,
//     image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
//   },
//   {
//     id: 3,
//     name: "Green Chilli Chutney",
//     price: 110,
//     image: "https://images.unsplash.com/photo-1626074353765-517a681e40be"
//   },
//   {
//     id: 4,
//     name: "Coriander Chutney",
//     price: 90,
//     image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5"
//   },
//   {
//     id: 5,
//     name: "Tomato Chutney",
//     price: 95,
//     image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
//   },
//   {
//     id: 6,
//     name: "Homemade Mango Achar",
//     price: 150,
//     image: "https://t4.ftcdn.net/jpg/01/43/08/01/360_F_143080110_bhy9PAHvK2A5K2HrlJqEnhHlJOXEZ8k0.jpg"
//   }
// ];

// function Products() {

//   return (

//     <div className="bg-orange-50 min-h-screen">

//       {/* PAGE HEADER */}

//       <div className="text-center py-16">

//         <h1 className="text-4xl font-bold text-green-800">
//           Our Homemade Chutneys
//         </h1>

//         <p className="mt-4 text-gray-600">
//           Freshly prepared after order using traditional recipes
//         </p>

//       </div>

//       {/* PRODUCTS GRID */}

//       <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 px-10 pb-20">

//         {products.map((p) => (
//           <ProductCard key={p.id} product={p} />
//         ))}

//       </div>

//     </div>

//   );

// }

// export default Products;



import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  return (

    <div className="bg-orange-50 min-h-screen">

      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-green-800">
          Our Homemade Chutneys
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10 px-10 pb-20">

        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}

      </div>

    </div>

  );

}

export default Products;
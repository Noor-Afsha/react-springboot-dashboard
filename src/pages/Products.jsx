import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";

function Products({ cartItems, setCartItems }) {

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
          <ProductCard
            key={p.id}
            product={p}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        ))}

      </div>

    </div>
  );
}

export default Products;
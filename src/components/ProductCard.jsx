function ProductCard({ product }) {

  return (

    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition hover:-translate-y-1">

      <img
        src={product.image}
        className="h-48 w-full object-cover rounded-t-xl"
      />

      <div className="p-5">

        <h2 className="text-lg font-semibold">
          {product.name}
        </h2>

        <p className="text-green-700 font-bold mt-2">
          ₹{product.price}
        </p>

        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Add to Cart
        </button>

      </div>

    </div>

  );

}

export default ProductCard;
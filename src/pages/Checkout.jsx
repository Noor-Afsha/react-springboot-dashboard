function Checkout() {

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold">
        Checkout
      </h1>

      <input
        placeholder="Name"
        className="border p-2 block mt-4"
      />

      <input
        placeholder="Address"
        className="border p-2 block mt-4"
      />

      <button className="bg-green-600 text-white px-6 py-2 mt-4">

        Place Order

      </button>

    </div>

  );

}

export default Checkout;
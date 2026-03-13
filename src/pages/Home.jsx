import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* HERO SECTION */}

      <div className="relative bg-gradient-to-r from-green-700 to-green-500 text-white px-10 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Fresh Homemade <br /> Chutneys & Pickles
            </h1>

            <p className="mt-6 text-lg text-green-100">
              Authentic homemade chutneys prepared with traditional recipes.
              Fresh ingredients, no preservatives, pure homemade taste.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                to="/products"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition"
              >
                Order Now
              </Link>

              <Link
                to="/about"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition"
              >
                Learn More
              </Link>
            </div>

            <div className="flex gap-8 mt-10 text-sm text-green-100">
              <div>🌿 No Preservatives</div>
              <div>🥭 Fresh Ingredients</div>
              <div>🚚 Delivery in 2 Days</div>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
            alt="chutney"
            className="w-[420px] rounded-2xl shadow-2xl mt-12 md:mt-0"
          />
        </div>
      </div>
      {/* ABOUT SECTION */}

      <div className="px-10 py-16 text-center bg-white">
        <h2 className="text-3xl font-bold text-green-800">
          Authentic Taste of India
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-gray-600">
          At <span className="font-semibold">Ghar Ka Zaika</span>, we bring the
          traditional flavors of homemade chutneys and achars straight to your
          home. Each jar is freshly prepared after your order using natural
          ingredients like mango, garlic, chilli, coriander, and spices. No
          preservatives, just pure homemade taste.
        </p>
      </div>

      {/* FEATURED PRODUCTS */}

      <div className="bg-green-50 px-10 py-16">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Popular Chutneys & Achar
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1625944525533-473f1a3d54e7"
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="mt-4 text-lg font-semibold">Mango Chutney</h3>

            <p className="text-green-700 font-bold mt-1">₹120</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="mt-4 text-lg font-semibold">Garlic Chutney</h3>

            <p className="text-green-700 font-bold mt-1">₹100</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <img
              src="https://t4.ftcdn.net/jpg/01/43/08/01/360_F_143080110_bhy9PAHvK2A5K2HrlJqEnhHlJOXEZ8k0.jpg"
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="mt-4 text-lg font-semibold">Homemade Mango Achar</h3>

            <p className="text-green-700 font-bold mt-1">₹150</p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}

      <div className="px-10 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Why Choose Ghar Ki Zaika?
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-16 mt-12 text-center">
          <div>
            <h3 className="text-xl font-semibold">🌿 Freshly Prepared</h3>
            <p>No preservatives used</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">🍃 Homemade Taste</h3>
            <p>Traditional family recipes</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">🚚 Fast Delivery</h3>
            <p>Delivered within 2 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-24 px-10 text-center">
        <h1 className="text-5xl font-bold">The Story of Ghar Ka Zaika</h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg">
          At Ghar Ka Zaika, we bring the authentic taste of traditional homemade
          chutneys and pickles prepared using age-old methods. Every jar is
          crafted with love, patience, and the same recipes our grandmothers
          used in their kitchens.
        </p>
      </div>

      {/* TRADITIONAL PROCESS */}

      <div className="px-10 py-20 flex flex-col md:flex-row items-center gap-16">
        <img
          src="https://m.media-amazon.com/images/I/71ZMzTcBguL.jpg"
          className="w-[420px] rounded-xl shadow-xl"
        />

        <div>
          <h2 className="text-3xl font-bold text-green-800">
            Ground on Traditional Stone
          </h2>

          <p className="mt-6 text-gray-700 leading-relaxed">
            "Unlike factory-made chutneys, each of our chutneys is lovingly
            prepared on a traditional stone grinder, or sil-batta, just like
            generations before us. This slow, careful grinding preserves every
            drop of natural oil, every burst of flavor, and the unforgettable
            aroma of fresh ingredients. The result? A rich, authentic taste that
            modern machines could never match—bringing the warmth of homemade
            goodness straight to your table."
          </p>

          <p className="mt-4 text-gray-700">
            "Every batch is lovingly prepared fresh, just for you, the moment
            you place your order—so you can savor the warmth, flavor, and care
            in every bite."
          </p>
        </div>
      </div>

      {/* INGREDIENTS */}

      <div className="bg-green-50 py-20 px-10 text-center">
        <h2 className="text-3xl font-bold text-green-800">
          Pure Ingredients, No Chemicals
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-gray-700">
          We use only fresh ingredients sourced from local farms — mangoes,
          garlic, coriander, chillies, and traditional spices. No artificial
          colors, no preservatives, just natural goodness.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          <div className="bg-white p-6 rounded-xl shadow">
            🌿 Fresh Ingredients
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            🧂 Traditional Spices
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            🚫 No Preservatives
          </div>
        </div>
      </div>
      {/* WHY CHOOSE US */}

      <div className="py-20 px-10 text-center">
        <h2 className="text-3xl font-bold text-green-800">
          Why People Love Our Chutneys
        </h2>

        <div className="grid md:grid-cols-4 gap-10 mt-12">
          <div>
            <h3 className="text-xl font-semibold">100% Homemade</h3>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Traditional Recipes</h3>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Freshly Prepared</h3>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Authentic Taste</h3>
          </div>
        </div>
      </div>
      {/* CTA */}

      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Taste the Tradition</h2>

        <p className="mt-4">
          Experience the authentic flavors of homemade chutneys.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}

export default About;

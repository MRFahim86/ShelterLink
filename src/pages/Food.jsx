import { Link } from "react-router-dom";

function Food() {
  const foodProviders = [
    {
      name: "Community Food Bank",
      location: "Dhanmondi, Dhaka",
      meals: 50,
      type: "Food Bank",
    },
    {
      name: "Hope Kitchen",
      location: "Mohammadpur, Dhaka",
      meals: 35,
      type: "Free Meals",
    },
    {
      name: "Helping Hands",
      location: "Mirpur, Dhaka",
      meals: 25,
      type: "Meal Provider",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link to="/services" className="text-2xl font-bold text-green-700">
            ShelterLink
          </Link>

          <Link
            to="/services"
            className="text-gray-700 hover:text-green-700"
          >
            ← Back to Services
          </Link>

        </div>
      </header>

      {/* Hero */}
      <section className="bg-orange-50 py-14 px-6 text-center">

        <div className="text-6xl">🍲</div>

        <h1 className="text-4xl font-bold text-gray-900 mt-5">
          Find Food
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Locate food providers and request available meals near you.
        </p>

      </section>

      {/* Search */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Search for food
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter your location"
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700">
              Search
            </button>

          </div>

        </div>

      </section>

      {/* Food providers */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-6">
          Available Food Providers
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {foodProviders.map((provider, index) => (

            <div
              key={index}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="text-4xl mb-4">
                🍲
              </div>

              <h3 className="text-xl font-bold">
                {provider.name}
              </h3>

              <p className="text-gray-600 mt-2">
                📍 {provider.location}
              </p>

              <p className="text-gray-600 mt-2">
                🍽️ {provider.meals} meals available
              </p>

              <span className="inline-block mt-4 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                {provider.type}
              </span>

              <button className="w-full mt-5 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700">
                Request Food
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Food;
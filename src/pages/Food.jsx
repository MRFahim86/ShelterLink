import { useState } from "react";
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

  // Search
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Food request modal
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Request form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    meals: "1",
  });

  // Success message
  const [success, setSuccess] = useState(false);

  // Filter food providers
  const filteredProviders = foodProviders.filter((provider) =>
    provider.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  // Search
  const handleSearch = () => {
    setSearchLocation(search);
  };

  // Form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open request form
  const handleRequest = (provider) => {
    setSelectedProvider(provider);
    setSuccess(false);

    setFormData({
      name: "",
      phone: "",
      meals: "1",
    });
  };

  // Submit request
  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setFormData({
      name: "",
      phone: "",
      meals: "1",
    });
  };

  // Close modal
  const closeModal = () => {
    setSelectedProvider(null);
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link
            to="/services"
            className="text-2xl font-bold text-green-700"
          >
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

        <div className="text-6xl">
          🍲
        </div>

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              onClick={handleSearch}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700"
            >
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

        {filteredProviders.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-6">

            {filteredProviders.map((provider, index) => (

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

                {/* Request Food */}
                <button
                  onClick={() => handleRequest(provider)}
                  className="w-full mt-5 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
                >
                  Request Food
                </button>

              </div>

            ))}

          </div>

        ) : (

          <div className="bg-white border rounded-2xl p-8 text-center">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              No food providers found
            </h3>

            <p className="text-gray-600 mt-2">
              Try searching for another location.
            </p>

          </div>

        )}

      </section>

      {/* ================= REQUEST FOOD MODAL ================= */}

      {selectedProvider && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            {!success ? (

              <>
                {/* Modal Header */}

                <div className="flex justify-between items-center mb-5">

                  <h2 className="text-2xl font-bold text-gray-900">
                    Request Food
                  </h2>

                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-900 text-2xl"
                  >
                    ×
                  </button>

                </div>

                {/* Selected Provider */}

                <div className="bg-orange-50 rounded-lg p-4 mb-5">

                  <h3 className="font-bold text-orange-800">
                    {selectedProvider.name}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    📍 {selectedProvider.location}
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    🍽️ {selectedProvider.meals} meals available
                  </p>

                </div>

                {/* Form */}

                <form onSubmit={handleSubmit}>

                  {/* Name */}

                  <label className="block font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  {/* Phone */}

                  <label className="block font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  {/* Meals */}

                  <label className="block font-semibold text-gray-700 mb-2">
                    Number of Meals
                  </label>

                  <select
                    name="meals"
                    value={formData.meals}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="1">1 Meal</option>
                    <option value="2">2 Meals</option>
                    <option value="3">3 Meals</option>
                    <option value="4">4 Meals</option>
                    <option value="5">5 Meals</option>
                  </select>

                  {/* Buttons */}

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
                    >
                      Submit Request
                    </button>

                  </div>

                </form>
              </>

            ) : (

              /* ================= SUCCESS ================= */

              <div className="text-center py-6">

                <div className="text-6xl mb-5">
                  ✅
                </div>

                <h2 className="text-2xl font-bold text-orange-600">
                  Request Submitted!
                </h2>

                <p className="text-gray-600 mt-3">
                  Your food request has been submitted successfully.
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  We will contact you regarding your request.
                </p>

                <button
                  onClick={closeModal}
                  className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700"
                >
                  Done
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Food;
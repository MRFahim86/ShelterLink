import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Food() {
  const initialProviders = [
    {
      id: 1,
      name: "Community Food Bank",
      location: "Dhanmondi, Dhaka",
      meals: 50,
      type: "Food Bank",
    },
    {
      id: 2,
      name: "Hope Kitchen",
      location: "Mohammadpur, Dhaka",
      meals: 35,
      type: "Free Meals",
    },
    {
      id: 3,
      name: "Helping Hands",
      location: "Mirpur, Dhaka",
      meals: 25,
      type: "Meal Provider",
    },
  ];

  // ================= FOOD PROVIDERS =================

  const [foodProviders, setFoodProviders] = useState(() => {
    const saved = localStorage.getItem(
      "shelterlink_food_providers"
    );

    return saved ? JSON.parse(saved) : initialProviders;
  });

  // Save updated meal availability
  useEffect(() => {
    localStorage.setItem(
      "shelterlink_food_providers",
      JSON.stringify(foodProviders)
    );
  }, [foodProviders]);

  // ================= SEARCH =================

  const [search, setSearch] = useState("");

  const filteredProviders = foodProviders.filter((provider) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      provider.name.toLowerCase().includes(searchText) ||
      provider.location.toLowerCase().includes(searchText) ||
      provider.type.toLowerCase().includes(searchText)
    );
  });

  // ================= MODAL =================

  const [selectedProvider, setSelectedProvider] = useState(null);

  const [success, setSuccess] = useState(false);

  // ================= FORM =================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    meals: "1",
  });

  // ================= MESSAGE =================

  const [message, setMessage] = useState("");

  // ================= SEARCH =================

  const handleSearch = () => {
    setSearch(search.trim());
  };

  const clearSearch = () => {
    setSearch("");
  };

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone number: digits only
    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "");

      setFormData((previous) => ({
        ...previous,
        phone: numbersOnly,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ================= OPEN REQUEST =================

  const handleRequest = (provider) => {
    if (provider.meals <= 0) {
      setMessage(
        "Sorry, this provider currently has no meals available."
      );

      setTimeout(() => {
        setMessage("");
      }, 4000);

      return;
    }

    setSelectedProvider(provider);

    setSuccess(false);

    setFormData({
      name: "",
      phone: "",
      meals: "1",
    });
  };

  // ================= SUBMIT REQUEST =================

  const handleSubmit = (e) => {
    e.preventDefault();

    const numberOfMeals = Number(formData.meals);

    // Validate name
    if (!formData.name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    // Validate phone
    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Validate meal availability
    if (numberOfMeals > selectedProvider.meals) {
      alert(
        `Only ${selectedProvider.meals} meal(s) are currently available.`
      );

      return;
    }

    // ================= CREATE REQUEST =================

    const request = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      meals: numberOfMeals,
      provider: selectedProvider.name,
      location: selectedProvider.location,
      type: selectedProvider.type,
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    // Get previous requests
    const previousRequests = JSON.parse(
      localStorage.getItem(
        "shelterlink_food_requests"
      ) || "[]"
    );

    // Add new request
    previousRequests.push(request);

    // Save request
    localStorage.setItem(
      "shelterlink_food_requests",
      JSON.stringify(previousRequests)
    );

    // ================= UPDATE MEALS =================

    setFoodProviders((previous) =>
      previous.map((provider) =>
        provider.id === selectedProvider.id
          ? {
              ...provider,
              meals: provider.meals - numberOfMeals,
            }
          : provider
      )
    );

    // Show success
    setSuccess(true);

    setFormData({
      name: "",
      phone: "",
      meals: "1",
    });
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setSelectedProvider(null);
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

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

      {/* ================= MESSAGE ================= */}

      {message && (
        <div className="fixed top-5 right-5 z-50 bg-orange-600 text-white px-6 py-4 rounded-lg shadow-lg">
          {message}
        </div>
      )}

      {/* ================= HERO ================= */}

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

      {/* ================= SEARCH ================= */}

      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Search for food
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter location, provider name, or type..."
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

            {search && (
              <button
                onClick={clearSearch}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Clear
              </button>
            )}

          </div>

          {search && (
            <p className="text-gray-600 mt-3">
              Showing results for:{" "}
              <strong>{search}</strong>
            </p>
          )}

        </div>

      </section>

      {/* ================= FOOD PROVIDERS ================= */}

      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-6">
          Available Food Providers
        </h2>

        {filteredProviders.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-6">

            {filteredProviders.map((provider) => (

              <div
                key={provider.id}
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

                <button
                  onClick={() => handleRequest(provider)}
                  disabled={provider.meals === 0}
                  className={`w-full mt-5 text-white py-3 rounded-lg font-semibold ${
                    provider.meals === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  {provider.meals === 0
                    ? "No Meals Available"
                    : "Request Food"}
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
              Try searching for Dhanmondi, Mohammadpur, or Mirpur.
            </p>

            <button
              onClick={clearSearch}
              className="mt-5 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Show All Providers
            </button>

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

                {/* FORM */}

                <form onSubmit={handleSubmit}>

                  {/* NAME */}

                  <label className="block font-semibold text-gray-700 mb-2">
                    Full Name *
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

                  {/* PHONE */}

                  <label className="block font-semibold text-gray-700 mb-2">
                    Phone Number *
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

                  {/* MEALS */}

                  <label className="block font-semibold text-gray-700 mb-2">
                    Number of Meals
                  </label>

                  <select
                    name="meals"
                    value={formData.meals}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {Array.from(
                      {
                        length: Math.min(
                          selectedProvider.meals,
                          10
                        ),
                      },
                      (_, index) => index + 1
                    ).map((number) => (
                      <option
                        key={number}
                        value={number}
                      >
                        {number}{" "}
                        {number === 1 ? "Meal" : "Meals"}
                      </option>
                    ))}
                  </select>

                  {/* BUTTONS */}

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

                <div className="bg-orange-50 rounded-lg p-4 mt-5 text-left">

                  <p>
                    <strong>Provider:</strong>{" "}
                    {selectedProvider.name}
                  </p>

                  <p className="mt-2">
                    <strong>Location:</strong>{" "}
                    {selectedProvider.location}
                  </p>

                  <p className="mt-2">
                    <strong>Status:</strong>{" "}
                    <span className="text-orange-600 font-semibold">
                      Pending
                    </span>
                  </p>

                </div>

                <p className="text-gray-500 text-sm mt-4">
                  Your request has been saved. The food
                  provider can review it later.
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
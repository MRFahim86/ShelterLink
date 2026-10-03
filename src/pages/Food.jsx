import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Food() {
  const [foodProviders, setFoodProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [requestData, setRequestData] = useState({
    name: "",
    phone: "",
    meals: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchFoodProviders = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/services?type=food"
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const formattedProviders = data.map((service) => ({
          id: service._id,
          name: service.name,
          location: service.location,
          meals: 50,
          type: "Food Provider",
          description: service.description,
          contact: service.contact,
          image: service.image,
        }));

        setFoodProviders(formattedProviders);
      } catch (err) {
        console.error("Error fetching food providers:", err);
        setError(err.message || "Failed to load food providers.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodProviders();
  }, []);

  const filteredProviders = foodProviders.filter((provider) => {
    const search = searchTerm.toLowerCase();

    return (
      provider.name.toLowerCase().includes(search) ||
      provider.location.toLowerCase().includes(search)
    );
  });

  const openRequestModal = (provider) => {
    setSelectedProvider(provider);
    setRequestData({
      name: "",
      phone: "",
      meals: "",
    });
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProvider(null);
    setFormError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();

    const requestedMeals = Number(requestData.meals);

    if (!requestData.name.trim()) {
      setFormError("Please enter your name.");
      return;
    }

    if (!requestData.phone.trim()) {
      setFormError("Please enter your phone number.");
      return;
    }

    if (!requestData.meals || requestedMeals <= 0) {
      setFormError("Please enter a valid number of meals.");
      return;
    }

    if (requestedMeals > selectedProvider.meals) {
      setFormError(
        `Only ${selectedProvider.meals} meals are currently available.`
      );
      return;
    }

    const newRequest = {
      id: Date.now(),
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      name: requestData.name,
      phone: requestData.phone,
      meals: requestedMeals,
      createdAt: new Date().toISOString(),
    };

    const existingRequests = JSON.parse(
      localStorage.getItem("shelterlink_food_requests") || "[]"
    );

    localStorage.setItem(
      "shelterlink_food_requests",
      JSON.stringify([...existingRequests, newRequest])
    );

    const updatedProvider = {
      ...selectedProvider,
      meals: selectedProvider.meals - requestedMeals,
    };

    setFoodProviders((prevProviders) =>
      prevProviders.map((provider) =>
        provider.id === selectedProvider.id ? updatedProvider : provider
      )
    );

    setSelectedProvider(updatedProvider);

    alert("Food request submitted successfully!");

    closeModal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-lg text-orange-700">
          Loading food providers...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4">
        <p className="text-red-600 text-lg mb-4">
          Failed to load food providers.
        </p>

        <p className="text-gray-600 mb-4">
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-orange-600"
          >
            ShelterLink
          </Link>

          <Link
            to="/"
            className="text-gray-600 hover:text-orange-600"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Food Support
          </h1>

          <p className="text-lg max-w-2xl mx-auto">
            Find available food providers and request meals for
            yourself or someone in need.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by provider name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Providers */}
        {filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No food providers found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Image */}
                {provider.image ? (
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-500 text-lg font-semibold">
                      Food Support
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {provider.name}
                  </h2>

                  <p className="text-orange-600 font-medium mb-2">
                    {provider.type}
                  </p>

                  <p className="text-gray-600 mb-2">
                    📍 {provider.location}
                  </p>

                  <p className="text-gray-700 mb-2">
                    {provider.description}
                  </p>

                  {provider.contact && (
                    <p className="text-gray-600 mb-3">
                      📞 {provider.contact}
                    </p>
                  )}

                  <p className="text-green-600 font-semibold mb-4">
                    {provider.meals} meals available
                  </p>

                  <button
                    onClick={() => openRequestModal(provider)}
                    disabled={provider.meals <= 0}
                    className={`w-full py-3 rounded-lg font-semibold text-white ${
                      provider.meals > 0
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {provider.meals > 0
                      ? "Request Food"
                      : "No Meals Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Request Modal */}
      {showModal && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Request Food
            </h2>

            <p className="text-gray-600 mb-6">
              Request food from{" "}
              <span className="font-semibold">
                {selectedProvider.name}
              </span>
            </p>

            <form onSubmit={handleRequestSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={requestData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={requestData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Meals */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Number of Meals
                </label>

                <input
                  type="number"
                  name="meals"
                  min="1"
                  max={selectedProvider.meals}
                  value={requestData.meals}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter number of meals"
                />
              </div>

              {/* Error */}
              {formError && (
                <p className="text-red-500 text-sm mb-4">
                  {formError}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Food;
import { useState } from "react";
import { Link } from "react-router-dom";

function Shelter() {
  const shelters = [
    {
      name: "Hope Community Shelter",
      location: "Dhanmondi, Dhaka",
      beds: 12,
      type: "Emergency Shelter",
    },
    {
      name: "Safe Haven Center",
      location: "Mohammadpur, Dhaka",
      beds: 8,
      type: "Temporary Shelter",
    },
    {
      name: "Community Care Home",
      location: "Mirpur, Dhaka",
      beds: 15,
      type: "Family Shelter",
    },
  ];

  // Search
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Request modal
  const [selectedShelter, setSelectedShelter] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    people: "1",
  });

  // Success message
  const [success, setSuccess] = useState(false);

  // Search filter
  const filteredShelters = shelters.filter((shelter) =>
    shelter.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  // Search button
  const handleSearch = () => {
    setSearchLocation(search);
  };

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open request form
  const handleRequest = (shelter) => {
    setSelectedShelter(shelter);
    setSuccess(false);

    setFormData({
      name: "",
      phone: "",
      people: "1",
    });
  };

  // Submit request
  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    // Form clear
    setFormData({
      name: "",
      phone: "",
      people: "1",
    });
  };

  // Close modal
  const closeModal = () => {
    setSelectedShelter(null);
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
      <section className="bg-green-50 py-14 px-6 text-center">

        <div className="text-6xl">
          🏠
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mt-5">
          Find a Shelter
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Find safe and temporary accommodation available in your community.
        </p>

      </section>

      {/* Search */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Search for shelters
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
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleSearch}
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800"
            >
              Search
            </button>

          </div>

        </div>

      </section>

      {/* Shelter List */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-6">
          Available Shelters
        </h2>

        {filteredShelters.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-6">

            {filteredShelters.map((shelter, index) => (

              <div
                key={index}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >

                <div className="text-4xl mb-4">
                  🏠
                </div>

                <h3 className="text-xl font-bold">
                  {shelter.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  📍 {shelter.location}
                </p>

                <p className="text-gray-600 mt-2">
                  🛏️ {shelter.beds} beds available
                </p>

                <span className="inline-block mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {shelter.type}
                </span>

                {/* Request Button */}
                <button
                  onClick={() => handleRequest(shelter)}
                  className="w-full mt-5 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
                >
                  Request Shelter
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
              No shelters found
            </h3>

            <p className="text-gray-600 mt-2">
              Try searching for another location.
            </p>

          </div>

        )}

      </section>

      {/* ================= REQUEST MODAL ================= */}

      {selectedShelter && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            {!success ? (

              <>
                {/* Modal Header */}

                <div className="flex justify-between items-center mb-5">

                  <h2 className="text-2xl font-bold text-gray-900">
                    Request Shelter
                  </h2>

                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-900 text-2xl"
                  >
                    ×
                  </button>

                </div>

                {/* Selected Shelter */}

                <div className="bg-green-50 rounded-lg p-4 mb-5">

                  <h3 className="font-bold text-green-800">
                    {selectedShelter.name}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    📍 {selectedShelter.location}
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    🛏️ {selectedShelter.beds} beds available
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
                    className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-green-500"
                  />

                  {/* People */}

                  <label className="block font-semibold text-gray-700 mb-2">
                    Number of People
                  </label>

                  <select
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
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
                      className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
                    >
                      Submit Request
                    </button>

                  </div>

                </form>
              </>

            ) : (

              /* ================= SUCCESS MESSAGE ================= */

              <div className="text-center py-6">

                <div className="text-6xl mb-5">
                  ✅
                </div>

                <h2 className="text-2xl font-bold text-green-700">
                  Request Submitted!
                </h2>

                <p className="text-gray-600 mt-3">
                  Your shelter request has been submitted successfully.
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  We will contact you regarding your request.
                </p>

                <button
                  onClick={closeModal}
                  className="mt-6 bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800"
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

export default Shelter;
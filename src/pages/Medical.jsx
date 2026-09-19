import { useState } from "react";
import { Link } from "react-router-dom";

function Medical() {
  const medicalCenters = [
    {
      id: 1,
      name: "Community Health Center",
      location: "Dhanmondi, Dhaka",
      service: "General Healthcare",
      status: "Open",
    },
    {
      id: 2,
      name: "Hope Medical Clinic",
      location: "Mohammadpur, Dhaka",
      service: "Primary Care",
      status: "Open",
    },
    {
      id: 3,
      name: "Care Hospital",
      location: "Mirpur, Dhaka",
      service: "Emergency Care",
      status: "Available",
    },
  ];

  const [search, setSearch] = useState("");

  const [showHelpModal, setShowHelpModal] = useState(false);

  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const [selectedCenter, setSelectedCenter] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    problem: "",
    urgency: "",
  });

  // Filter medical centers
  const filteredCenters = medicalCenters.filter((center) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      center.name.toLowerCase().includes(searchText) ||
      center.location.toLowerCase().includes(searchText) ||
      center.service.toLowerCase().includes(searchText)
    );
  });

  // Search button
  const handleSearch = () => {
    setSearch(search.trim());
  };

  // Clear search
  const clearSearch = () => {
    setSearch("");
  };

  // Open Get Help form
  const openHelpForm = (center) => {
    setSelectedCenter(center);

    const savedInfo = localStorage.getItem("shelterlink_medical_user");

    if (savedInfo) {
      setFormData(JSON.parse(savedInfo));
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        problem: "",
        urgency: "",
      });
    }

    setShowHelpModal(true);
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

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

  // Submit medical request
  const handleMedicalSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.problem ||
      !formData.urgency
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    const request = {
      ...formData,
      center: selectedCenter?.name || "Emergency Medical Help",
      location: selectedCenter?.location || "Emergency",
      date: new Date().toLocaleString(),
    };

    // Save user's basic information
    localStorage.setItem(
      "shelterlink_medical_user",
      JSON.stringify(formData)
    );

    // Get previous requests
    const previousRequests = JSON.parse(
      localStorage.getItem("shelterlink_medical_requests") || "[]"
    );

    // Add new request
    previousRequests.push(request);

    // Save requests
    localStorage.setItem(
      "shelterlink_medical_requests",
      JSON.stringify(previousRequests)
    );

    setSuccessMessage(
      selectedCenter
        ? `Medical help requested from ${selectedCenter.name}!`
        : "Emergency medical request submitted!"
    );

    setShowHelpModal(false);
    setShowEmergencyModal(false);
    setSelectedCenter(null);

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
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

      {/* Success message */}
      {successMessage && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg">
          ✓ {successMessage}
        </div>
      )}

      {/* Hero */}
      <section className="bg-blue-50 py-14 px-6 text-center">

        <div className="text-6xl">🏥</div>

        <h1 className="text-4xl font-bold text-gray-900 mt-5">
          Medical Assistance
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Find healthcare information and medical assistance available
          in your community.
        </p>

      </section>

      {/* Emergency */}
      <section className="max-w-6xl mx-auto px-6 pt-10">

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

          <h2 className="text-xl font-bold text-red-700">
            🚨 Medical Emergency?
          </h2>

          <p className="text-gray-700 mt-2">
            If you are experiencing a serious medical emergency,
            seek emergency medical assistance immediately.
          </p>

          <button
            onClick={() => {
              setFormData({
                name: "",
                phone: "",
                email: "",
                problem: "",
                urgency: "Emergency",
              });

              setShowEmergencyModal(true);
            }}
            className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Find Emergency Help
          </button>

        </div>

      </section>

      {/* Search */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Find Medical Services
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Enter your location"
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
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

      {/* Medical Centers */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-6">
          Available Medical Services
        </h2>

        {filteredCenters.length === 0 ? (

          <div className="bg-white border rounded-2xl p-10 text-center">

            <div className="text-5xl">🔍</div>

            <h3 className="text-xl font-bold mt-4">
              No medical services found
            </h3>

            <p className="text-gray-600 mt-2">
              Try searching for Dhanmondi, Mohammadpur, or Mirpur.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {filteredCenters.map((center) => (

              <div
                key={center.id}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >

                <div className="text-4xl mb-4">
                  🏥
                </div>

                <h3 className="text-xl font-bold">
                  {center.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  📍 {center.location}
                </p>

                <p className="text-gray-600 mt-2">
                  🩺 {center.service}
                </p>

                <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {center.status}
                </span>

                <button
                  onClick={() => openHelpForm(center)}
                  className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Get Help
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* Medical Help Modal */}
      {showHelpModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="p-6 border-b flex justify-between items-center">

              <div>
                <h2 className="text-2xl font-bold">
                  Request Medical Help
                </h2>

                <p className="text-blue-600 font-semibold mt-1">
                  {selectedCenter?.name}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowHelpModal(false);
                  setSelectedCenter(null);
                }}
                className="text-2xl text-gray-500 hover:text-red-600"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleMedicalSubmit}
              className="p-6 space-y-4"
            >

              {/* Name */}
              <div>
                <label className="block font-semibold mb-1">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold mb-1">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-1">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Problem */}
              <div>
                <label className="block font-semibold mb-1">
                  Medical Problem *
                </label>

                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Briefly describe your problem..."
                  rows="4"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="block font-semibold mb-1">
                  Urgency *
                </label>

                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                  required
                >

                  <option value="">
                    Select urgency
                  </option>

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Emergency">
                    Emergency
                  </option>

                </select>
              </div>

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowHelpModal(false);
                    setSelectedCenter(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Request Help
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* Emergency Modal */}
      {showEmergencyModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

            <div className="p-6 border-b flex justify-between items-center">

              <h2 className="text-2xl font-bold text-red-600">
                🚨 Emergency Medical Help
              </h2>

              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-2xl text-gray-500 hover:text-red-600"
              >
                ×
              </button>

            </div>

            <div className="p-6">

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">

                <h3 className="font-bold text-red-700">
                  If this is a life-threatening emergency
                </h3>

                <p className="text-gray-700 mt-2">
                  Contact your local emergency medical service
                  immediately or go to the nearest hospital.
                </p>

              </div>

              <div className="mt-5">

                <h3 className="font-bold text-lg">
                  Request Emergency Assistance
                </h3>

                <form
                  onSubmit={handleMedicalSubmit}
                  className="space-y-4 mt-4"
                >

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border rounded-lg px-4 py-3"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border rounded-lg px-4 py-3"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border rounded-lg px-4 py-3"
                    required
                  />

                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder="Describe the emergency"
                    rows="3"
                    className="w-full border rounded-lg px-4 py-3"
                    required
                  />

                  <input
                    type="hidden"
                    name="urgency"
                    value="Emergency"
                  />

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={() => setShowEmergencyModal(false)}
                      className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                    >
                      Submit Emergency Request
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Medical;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Shelter() {
  // ================= SHELTERS =================

  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= SEARCH =================

  const [search, setSearch] = useState("");

  // ================= MODAL =================

  const [selectedShelter, setSelectedShelter] = useState(null);
  const [success, setSuccess] = useState(false);

  // ================= FORM =================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    people: "1",
  });

  // ================= MESSAGE =================

  const [message, setMessage] = useState("");

  // ================= FETCH SHELTERS =================

  useEffect(() => {
    fetch("http://localhost:4000/api/services?type=shelter")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load shelters");
        }

        const data = await response.json();

        // Add default beds if backend/database does not have beds yet
        const sheltersWithBeds = data.map((shelter, index) => ({
          ...shelter,
          beds:
            typeof shelter.beds === "number"
              ? shelter.beds
              : index === 0
              ? 12
              : index === 1
              ? 8
              : 15,
        }));

        setShelters(sheltersWithBeds);
      })
      .catch((error) => {
        console.log("Shelter fetch error:", error);

        setError(
          "Unable to load shelters. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ================= SEARCH =================

  const filteredShelters = shelters.filter((shelter) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      shelter.name?.toLowerCase().includes(searchText) ||
      shelter.location?.toLowerCase().includes(searchText) ||
      shelter.shelterType?.toLowerCase().includes(searchText) ||
      shelter.description?.toLowerCase().includes(searchText)
    );
  });

  // ================= INPUT =================

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

  // ================= REQUEST SHELTER =================

  const handleRequest = (shelter) => {
    if ((shelter.beds || 0) <= 0) {
      setMessage(
        "Sorry, this shelter currently has no available beds."
      );

      setTimeout(() => {
        setMessage("");
      }, 4000);

      return;
    }

    setSelectedShelter(shelter);

    setSuccess(false);

    setFormData({
      name: "",
      phone: "",
      people: "1",
    });
  };

  // ================= SUBMIT REQUEST =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numberOfPeople = Number(formData.people);

    // Validate name
    if (!formData.name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    // Validate phone
    if (!formData.phone) {
      alert("Please enter your phone number.");
      return;
    }

    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Validate number of people
    if (numberOfPeople < 1) {
      alert("Number of people must be at least 1.");
      return;
    }

    // Check available beds
    if (
      numberOfPeople >
      (selectedShelter.beds || 0)
    ) {
      alert(
        `Only ${selectedShelter.beds} bed(s) are currently available.`
      );

      return;
    }

    // ================= SEND TO BACKEND =================

    try {
      const response = await fetch(
        "http://localhost:4000/api/shelter-requests",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone,
            people: numberOfPeople,

            shelter: selectedShelter.name,

            location: selectedShelter.location,

            type:
              selectedShelter.shelterType ||
              "Shelter",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to submit shelter request."
        );

        return;
      }

      // ================= UPDATE LOCAL BED COUNT =================

      const updatedBeds =
        selectedShelter.beds - numberOfPeople;

      setShelters((previous) =>
        previous.map((shelter) =>
          shelter._id === selectedShelter._id
            ? {
                ...shelter,
                beds: updatedBeds,
              }
            : shelter
        )
      );

      setSelectedShelter({
        ...selectedShelter,
        beds: updatedBeds,
      });

      // ================= SUCCESS =================

      setSuccess(true);

      setFormData({
        name: "",
        phone: "",
        people: "1",
      });
    } catch (error) {
      console.log(
        "Submit shelter request error:",
        error
      );

      alert(
        "Server error. Please make sure the backend is running."
      );
    }
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setSelectedShelter(null);
    setSuccess(false);
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-green-700">
          Loading shelters...
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-5xl mb-4">
          ⚠️
        </div>

        <h2 className="text-2xl font-bold text-center">
          {error}
        </h2>

        <p className="text-gray-600 mt-3">
          Make sure your backend server is running.
        </p>
      </div>
    );
  }

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
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg">
          {message}
        </div>
      )}

      {/* ================= HERO ================= */}

      <section className="bg-green-50 py-14 px-6 text-center">

        <div className="text-6xl">
          🏠
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mt-5">
          Find a Shelter
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Find safe and temporary accommodation
          available in your community.
        </p>

      </section>

      {/* ================= SEARCH ================= */}

      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Search for shelters
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter location, shelter name, or type..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
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

      {/* ================= SHELTER LIST ================= */}

      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-6">
          Available Shelters
        </h2>

        {filteredShelters.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-6">

            {filteredShelters.map((shelter) => (

              <div
                key={shelter._id}
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
                  {shelter.shelterType || "Shelter"}
                </span>

                <p className="text-gray-600 mt-4">
                  {shelter.description}
                </p>

                <button
                  onClick={() =>
                    handleRequest(shelter)
                  }
                  disabled={
                    (shelter.beds || 0) === 0
                  }
                  className={`w-full mt-5 text-white py-3 rounded-lg font-semibold ${
                    (shelter.beds || 0) === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800"
                  }`}
                >
                  {(shelter.beds || 0) === 0
                    ? "No Beds Available"
                    : "Request Shelter"}
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
              Try searching for Dhanmondi,
              Mohammadpur, or Mirpur.
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-5 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Show All Shelters
            </button>

          </div>

        )}

      </section>

      {/* ================= REQUEST MODAL ================= */}

      {selectedShelter && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            {!success ? (

              <>

                {/* MODAL HEADER */}

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

                {/* SELECTED SHELTER */}

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
                    className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-green-500"
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
                    inputMode="numeric"
                    className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-green-500"
                  />

                  {/* NUMBER OF PEOPLE */}

                  <label className="block font-semibold text-gray-700 mb-2">
                    Number of People *
                  </label>

                  <select
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-green-500"
                  >

                    {Array.from(
                      {
                        length: Math.min(
                          selectedShelter.beds || 0,
                          5
                        ),
                      },
                      (_, index) => index + 1
                    ).map((number) => (

                      <option
                        key={number}
                        value={number}
                      >
                        {number}{" "}
                        {number === 1
                          ? "Person"
                          : "People"}
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
                      className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
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

                <h2 className="text-2xl font-bold text-green-700">
                  Request Submitted!
                </h2>

                <p className="text-gray-600 mt-3">
                  Your shelter request has been
                  submitted successfully.
                </p>

                <div className="bg-green-50 rounded-lg p-4 mt-5 text-left">

                  <p>
                    <strong>Shelter:</strong>{" "}
                    {selectedShelter.name}
                  </p>

                  <p className="mt-2">
                    <strong>Location:</strong>{" "}
                    {selectedShelter.location}
                  </p>

                  <p className="mt-2">
                    <strong>People:</strong>{" "}
                    {selectedShelter.beds}
                  </p>

                  <p className="mt-2">
                    <strong>Status:</strong>{" "}
                    <span className="text-orange-600 font-semibold">
                      Pending
                    </span>
                  </p>

                </div>

                <p className="text-gray-500 text-sm mt-4">
                  Your request has been saved
                  to MongoDB.
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Volunteer() {
  const initialOpportunities = [
    {
      id: 1,
      title: "Community Food Distribution",
      location: "Dhanmondi, Dhaka",
      time: "Saturday, 10:00 AM",
      volunteers: 5,
    },
    {
      id: 2,
      title: "Shelter Support",
      location: "Mohammadpur, Dhaka",
      time: "Sunday, 11:00 AM",
      volunteers: 3,
    },
    {
      id: 3,
      title: "Community Outreach",
      location: "Mirpur, Dhaka",
      time: "Friday, 3:00 PM",
      volunteers: 8,
    },
  ];

  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem("shelterlink_opportunities");

    return saved ? JSON.parse(saved) : initialOpportunities;
  });

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [registered, setRegistered] = useState(() => {
    return localStorage.getItem("shelterlink_volunteer") !== null;
  });

  const [joinedOpportunities, setJoinedOpportunities] = useState(() => {
    const saved = localStorage.getItem("shelterlink_joined_opportunities");

    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    skills: "",
    availability: "",
  });

  // Save opportunities whenever they change
  useEffect(() => {
    localStorage.setItem(
      "shelterlink_opportunities",
      JSON.stringify(opportunities)
    );
  }, [opportunities]);

  // Search opportunities
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    return (
      opportunity.title.toLowerCase().includes(searchText) ||
      opportunity.location.toLowerCase().includes(searchText) ||
      opportunity.time.toLowerCase().includes(searchText)
    );
  });

  // Open general volunteer registration
  const openRegistration = () => {
    setSelectedOpportunity(null);

    const savedVolunteer = localStorage.getItem("shelterlink_volunteer");

    if (savedVolunteer) {
      setFormData(JSON.parse(savedVolunteer));
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        skills: "",
        availability: "",
      });
    }

    setSuccessMessage("");
    setShowModal(true);
  };

  // Open join form for an opportunity
  const openJoinForm = (opportunity) => {
    if (opportunity.volunteers <= 0) {
      setSuccessMessage("Sorry, no spots are available for this opportunity.");
      setTimeout(() => setSuccessMessage(""), 4000);
      return;
    }

    if (joinedOpportunities.includes(opportunity.id)) {
      setSuccessMessage(
        `You have already joined "${opportunity.title}".`
      );

      setTimeout(() => setSuccessMessage(""), 4000);
      return;
    }

    setSelectedOpportunity(opportunity);

    const savedVolunteer = localStorage.getItem("shelterlink_volunteer");

    if (savedVolunteer) {
      setFormData(JSON.parse(savedVolunteer));
    }

    setSuccessMessage("");
    setShowModal(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");

      setFormData((previous) => ({
        ...previous,
        [name]: onlyNumbers,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit volunteer form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.location ||
      !formData.skills ||
      !formData.availability
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Save volunteer registration
    localStorage.setItem(
      "shelterlink_volunteer",
      JSON.stringify(formData)
    );

    setRegistered(true);

    // If joining an opportunity
    if (selectedOpportunity) {
      const alreadyJoined = joinedOpportunities.includes(
        selectedOpportunity.id
      );

      if (!alreadyJoined) {
        const updatedJoined = [
          ...joinedOpportunities,
          selectedOpportunity.id,
        ];

        setJoinedOpportunities(updatedJoined);

        localStorage.setItem(
          "shelterlink_joined_opportunities",
          JSON.stringify(updatedJoined)
        );

        // Decrease available spots
        setOpportunities((previous) =>
          previous.map((opportunity) =>
            opportunity.id === selectedOpportunity.id
              ? {
                  ...opportunity,
                  volunteers: Math.max(
                    0,
                    opportunity.volunteers - 1
                  ),
                }
              : opportunity
          )
        );

        setSuccessMessage(
          `Successfully joined "${selectedOpportunity.title}"!`
        );
      }
    } else {
      setSuccessMessage("Volunteer registration successful!");
    }

    setTimeout(() => {
      setShowModal(false);
      setSelectedOpportunity(null);
      setSuccessMessage("");
    }, 2000);
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
      <section className="bg-purple-50 py-14 px-6 text-center">

        <div className="text-6xl">🤝</div>

        <h1 className="text-4xl font-bold text-gray-900 mt-5">
          Become a Volunteer
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Give your time and skills to support people in need in your
          community.
        </p>

        <button
          onClick={openRegistration}
          className="mt-7 bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800"
        >
          {registered ? "Update Volunteer Registration" : "Register as Volunteer"}
        </button>

        {registered && (
          <p className="text-green-700 font-semibold mt-3">
            ✓ You are registered as a volunteer
          </p>
        )}

      </section>

      {/* Why volunteer */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-center">
          Why Volunteer?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white border rounded-2xl p-6 text-center">
            <div className="text-4xl">❤️</div>

            <h3 className="font-bold text-xl mt-4">
              Help Others
            </h3>

            <p className="text-gray-600 mt-2">
              Make a meaningful difference in someone's life.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6 text-center">
            <div className="text-4xl">🌱</div>

            <h3 className="font-bold text-xl mt-4">
              Build Community
            </h3>

            <p className="text-gray-600 mt-2">
              Work together to create a stronger community.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6 text-center">
            <div className="text-4xl">⭐</div>

            <h3 className="font-bold text-xl mt-4">
              Gain Experience
            </h3>

            <p className="text-gray-600 mt-2">
              Develop valuable teamwork and communication skills.
            </p>
          </div>

        </div>

      </section>

      {/* Volunteer Opportunities */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-3xl font-bold mb-7">
          Volunteer Opportunities
        </h2>

        {/* Search */}
        <div className="bg-white border rounded-2xl p-5 mb-8">

          <label className="block font-semibold mb-2">
            Search opportunities
          </label>

          <div className="flex gap-3">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location or opportunity..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={() => setSearch("")}
              className="px-6 py-3 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300"
            >
              Clear
            </button>

          </div>

          {search && (
            <p className="text-gray-600 mt-3">
              Showing results for: <strong>{search}</strong>
            </p>
          )}

        </div>

        {/* Cards */}
        {filteredOpportunities.length === 0 ? (

          <div className="bg-white border rounded-2xl p-10 text-center">
            <div className="text-5xl">🔍</div>

            <h3 className="text-xl font-bold mt-4">
              No opportunities found
            </h3>

            <p className="text-gray-600 mt-2">
              Try searching for another location or opportunity.
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {filteredOpportunities.map((opportunity) => {

              const hasJoined = joinedOpportunities.includes(
                opportunity.id
              );

              return (
                <div
                  key={opportunity.id}
                  className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >

                  <div className="text-4xl">
                    🤝
                  </div>

                  <h3 className="text-xl font-bold mt-4">
                    {opportunity.title}
                  </h3>

                  <p className="text-gray-600 mt-3">
                    📍 {opportunity.location}
                  </p>

                  <p className="text-gray-600 mt-2">
                    🕒 {opportunity.time}
                  </p>

                  <p className="text-gray-600 mt-2">
                    👥 {opportunity.volunteers} spots available
                  </p>

                  <button
                    onClick={() => openJoinForm(opportunity)}
                    disabled={hasJoined || opportunity.volunteers === 0}
                    className={`w-full mt-5 py-3 rounded-lg font-semibold text-white ${
                      hasJoined
                        ? "bg-gray-500 cursor-not-allowed"
                        : opportunity.volunteers === 0
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800"
                    }`}
                  >
                    {hasJoined
                      ? "✓ Joined"
                      : opportunity.volunteers === 0
                      ? "No Spots Available"
                      : "Join Opportunity"}
                  </button>

                </div>
              );
            })}

          </div>

        )}

      </section>

      {/* Volunteer Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="p-6 border-b flex justify-between items-center">

              <div>
                <h2 className="text-2xl font-bold">
                  {selectedOpportunity
                    ? "Join Opportunity"
                    : "Volunteer Registration"}
                </h2>

                {selectedOpportunity && (
                  <p className="text-green-700 font-semibold mt-1">
                    {selectedOpportunity.title}
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedOpportunity(null);
                }}
                className="text-2xl text-gray-500 hover:text-red-600"
              >
                ×
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
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

              {/* Location */}
              <div>
                <label className="block font-semibold mb-1">
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Mirpur, Dhaka"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block font-semibold mb-1">
                  Skills *
                </label>

                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. Teaching, Food distribution, First aid..."
                  rows="3"
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              {/* Availability */}
              <div>
                <label className="block font-semibold mb-1">
                  Availability *
                </label>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                  required
                >
                  <option value="">
                    Select availability
                  </option>

                  <option value="Weekdays">
                    Weekdays
                  </option>

                  <option value="Weekends">
                    Weekends
                  </option>

                  <option value="Both">
                    Weekdays & Weekends
                  </option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOpportunity(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
                >
                  {selectedOpportunity
                    ? "Confirm Join"
                    : "Register"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Volunteer;
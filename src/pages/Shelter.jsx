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
      <section className="bg-green-50 py-14 px-6 text-center">

        <div className="text-6xl">🏠</div>

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
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800">
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

        <div className="grid md:grid-cols-3 gap-6">

          {shelters.map((shelter, index) => (

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

              <button className="w-full mt-5 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800">
                Request Shelter
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Shelter;
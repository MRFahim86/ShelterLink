import { Link } from "react-router-dom";

function Medical() {
  const medicalCenters = [
    {
      name: "Community Health Center",
      location: "Dhanmondi, Dhaka",
      service: "General Healthcare",
      status: "Open",
    },
    {
      name: "Hope Medical Clinic",
      location: "Mohammadpur, Dhaka",
      service: "Primary Care",
      status: "Open",
    },
    {
      name: "Care Hospital",
      location: "Mirpur, Dhaka",
      service: "Emergency Care",
      status: "Available",
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

          <button className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700">
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
              placeholder="Enter your location"
              className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Search
            </button>

          </div>

        </div>

      </section>

      {/* Medical Centers */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-6">
          Available Medical Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {medicalCenters.map((center, index) => (

            <div
              key={index}
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

              <button className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Get Help
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Medical;
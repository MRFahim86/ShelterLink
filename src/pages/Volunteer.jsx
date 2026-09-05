import { Link } from "react-router-dom";

function Volunteer() {
  const opportunities = [
    {
      title: "Community Food Distribution",
      location: "Dhanmondi, Dhaka",
      time: "Saturday, 10:00 AM",
      volunteers: 5,
    },
    {
      title: "Shelter Support",
      location: "Mohammadpur, Dhaka",
      time: "Sunday, 11:00 AM",
      volunteers: 3,
    },
    {
      title: "Community Outreach",
      location: "Mirpur, Dhaka",
      time: "Friday, 3:00 PM",
      volunteers: 8,
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
      <section className="bg-purple-50 py-14 px-6 text-center">

        <div className="text-6xl">🤝</div>

        <h1 className="text-4xl font-bold text-gray-900 mt-5">
          Become a Volunteer
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Give your time and skills to support people in need in your
          community.
        </p>

        <button className="mt-7 bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800">
          Register as Volunteer
        </button>

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

      {/* Opportunities */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-3xl font-bold mb-7">
          Volunteer Opportunities
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {opportunities.map((opportunity, index) => (

            <div
              key={index}
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

              <button className="w-full mt-5 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800">
                Join Opportunity
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Volunteer;
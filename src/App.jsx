import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Donate from "./pages/Donate";
import User from "./pages/User";

import Shelter from "./pages/Shelter";
import Food from "./pages/Food";
import Medical from "./pages/Medical";
import Volunteer from "./pages/Volunteer";

// ================= SERVICES PAGE =================

function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-700">
            ShelterLink
          </Link>

          <nav className="flex gap-8">
            <Link to="/" className="text-gray-700 hover:text-green-700">
              Home
            </Link>

            <Link to="/services" className="text-green-700 font-semibold">
              Services
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-14 px-6">
        <p className="text-green-700 font-bold tracking-wide text-lg">
          HOW CAN WE HELP?
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Support when you need it most
        </h1>

        <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
          ShelterLink connects people with essential support services available
          in their community.
        </p>
      </section>

      {/* Service Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Shelter */}
          <ServiceCard
            icon="🏠"
            title="Shelter"
            description="Find nearby temporary shelters and available beds."
            button="Find Shelter →"
            link="/services/shelter"
          />

          {/* Food */}
          <ServiceCard
            icon="🍲"
            title="Food"
            description="Locate food providers and request available meals."
            button="Find Food →"
            link="/services/food"
          />

          {/* Medical */}
          <ServiceCard
            icon="🏥"
            title="Medical"
            description="Get healthcare information and medical assistance."
            button="Get Medical Help →"
            link="/services/medical"
          />

          {/* Volunteer */}
          <ServiceCard
            icon="🤝"
            title="Volunteer"
            description="Help people in need by volunteering in your community."
            button="Become a Volunteer →"
            link="/services/volunteer"
          />
        </div>
      </section>
    </div>
  );
}

// ================= SERVICE CARD =================

function ServiceCard({ icon, title, description, button, link }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center hover:shadow-lg transition">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-6">{title}</h2>

      <p className="text-gray-600 mt-4 leading-relaxed min-h-[90px]">
        {description}
      </p>

      <Link
        to={link}
        className="inline-block mt-5 text-green-700 font-bold hover:text-green-900"
      >
        {button}
      </Link>
    </div>
  );
}

// ================= MAIN APP =================

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTHENTICATION */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

  	{/* USER PAGE */}
<Route path="/user" element={<User />} />

        {/* DONATE */}
        <Route path="/donate" element={<Donate />} />

        {/* SERVICES */}
        <Route path="/services" element={<Services />} />

        {/* INDIVIDUAL SERVICES */}
        <Route path="/services/shelter" element={<Shelter />} />

        <Route path="/services/food" element={<Food />} />

        <Route path="/services/medical" element={<Medical />} />

        <Route path="/services/volunteer" element={<Volunteer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

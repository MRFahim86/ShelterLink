import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import Contact from "./pages/contact";
import { useEffect, useState } from "react";
import Home from "./pages/home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Donate from "./pages/Donate";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Shelter from "./pages/Shelter";
import Food from "./pages/Food";
import Medical from "./pages/Medical";
import Volunteer from "./pages/Volunteer";
import Help from "./pages/Help";
import DonationInfo from "./pages/DonationInfo";
import CarbonFootprintDisplay from "./pages/CarbonFootprintDisplay";

// ================= SERVICES PAGE =================

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get services from MongoDB through backend API
  useEffect(() => {
    fetch("http://localhost:4000/api/services")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load services");
        }

        return response.json();
      })
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("Service loading error:", error);
        setError("Unable to load services.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Get icon according to service type
  const getServiceIcon = (type) => {
    switch (type) {
      case "shelter":
        return "🏠";

      case "food":
        return "🍲";

      case "medical":
        return "🏥";

      case "volunteer":
        return "🙋";

      default:
        return "❓";
    }
  };

  // Get frontend page according to service type
  const getServiceLink = (type) => {
    switch (type) {
      case "shelter":
        return "/services/shelter";

      case "food":
        return "/services/food";

      case "medical":
        return "/services/medical";

      case "volunteer":
        return "/services/volunteer";

      default:
        return "/services";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-700">
            ShelterLink
          </Link>

          <nav className="flex gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-700"
            >
              Home
            </Link>

            <Link
              to="/services"
              className="text-green-700 font-semibold"
            >
              Services
            </Link>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="text-center py-14 px-6">
        <p className="text-green-700 font-bold tracking-wide text-lg">
          HOW CAN WE HELP?
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Support when you need it most
        </h1>

        <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
          ShelterLink connects people with essential support services
          available in their community.
        </p>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        {/* Loading */}

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Loading services...
            </p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">
              {error}
            </p>

            <p className="text-gray-500 mt-2">
              Please make sure the backend server is running.
            </p>
          </div>
        )}

        {/* Empty database */}

        {!loading && !error && services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No services available.
            </p>

            <p className="text-gray-500 mt-2">
              Please add services to the database.
            </p>
          </div>
        )}

        {/* Service Cards */}

        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                icon={getServiceIcon(service.type)}
                title={service.name}
                description={service.description}
                location={service.location}
                contact={service.contact}
                image={service.image}
                link={getServiceLink(service.type)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ================= SERVICE CARD =================

function ServiceCard({
  icon,
  title,
  description,
  location,
  contact,
  image,
  link,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center hover:shadow-lg transition">

      {/* Image if available */}

      {image ? (
        <div className="w-16 h-16 rounded-full overflow-hidden mx-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
          {icon}
        </div>
      )}

      {/* Title */}

      <h2 className="text-2xl font-bold text-gray-900 mt-6">
        {title}
      </h2>

      {/* Description */}

      <p className="text-gray-600 mt-4 leading-relaxed min-h-[90px]">
        {description}
      </p>

      {/* Location */}

      {location && (
        <p className="text-sm text-gray-500 mt-3">
          📍 {location}
        </p>
      )}

      {/* Contact */}

      {contact && (
        <p className="text-sm text-gray-500 mt-2">
          📞 {contact}
        </p>
      )}

      {/* Button */}

      <Link
        to={link}
        className="inline-block mt-5 text-green-700 font-bold hover:text-green-900"
      >
        Learn More →
      </Link>
    </div>
  );
}

// ================= LOGIN PROTECTION =================

function LoginProtection({ children }) {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/user/profile", {
      credentials: "include",
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();

          setLoggedIn(true);
          setRole(data.user.role);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  // While checking login status

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  // User is already logged in

  if (loggedIn) {

    // Admin user

    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    // Normal user trying to access login

    if (location.state?.from === "/donate") {
      return <Navigate to="/donate" replace />;
    }

    return <Navigate to="/user" replace />;
  }

  return children;
}

// ================= MAIN APP =================

function App() {
  return (
    <BrowserRouter>
      <CarbonFootprintDisplay />

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= CONTACT ================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* ================= AUTHENTICATION ================= */}

        <Route
          path="/login"
          element={
            <LoginProtection>
              <Login />
            </LoginProtection>
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= HELP ================= */}

        <Route
          path="/help"
          element={<Help />}
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* ================= USER ================= */}

        <Route
          path="/user"
          element={<User />}
        />

        {/* ================= DONATE ================= */}

        <Route
          path="/donate"
          element={<Donate />}
        />

        {/* ================= DONATION INFO ================= */}

        <Route
          path="/donation-info"
          element={<DonationInfo />}
        />

        {/* ================= SERVICES ================= */}

        <Route
          path="/services"
          element={<Services />}
        />

        {/* ================= INDIVIDUAL SERVICES ================= */}

        <Route
          path="/services/shelter"
          element={<Shelter />}
        />

        <Route
          path="/services/food"
          element={<Food />}
        />

        <Route
          path="/services/medical"
          element={<Medical />}
        />

        <Route
          path="/services/volunteer"
          element={<Volunteer />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
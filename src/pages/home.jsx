import heroImage from "../assets/shelter.jpeg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Shelter<span className="text-green-700">Link</span>
            </h1>

            <p className="text-sm italic text-gray-500">
              connecting people to safety, shelter and support
            </p>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#home" className="hover:text-green-700">
              Home
            </a>

            <a href="#services" className="hover:text-green-700">
              Services
            </a>

            <a href="#find-help" className="hover:text-green-700">
              Find Help
            </a>

            <a href="#donate" className="hover:text-green-700">
              Donate
            </a>

            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-green-700 px-6 py-3 text-white hover:bg-green-800"
            >
              Login
            </button>

            <button className="rounded-full bg-green-700 px-6 py-3 text-white hover:bg-green-800">
              Need Help?
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[600px] overflow-hidden">
        <img
          src={heroImage}
          alt="ShelterLink community support"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-6">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-lg font-semibold uppercase tracking-wider text-green-300">
              You are not alone
            </p>

            <h2 className="text-5xl font-bold leading-tight md:text-6xl">
              Everyone deserves
              <br />a safe place.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-100">
              Find shelter, food, healthcare and community support through one
              simple platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700">
                Find Help Near You
              </button>

              <button className="rounded-full bg-white px-8 py-4 font-semibold text-gray-900 hover:bg-gray-100">
                Request Help
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-wider text-green-700">
              How Can We Help?
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Support when you need it most
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              ShelterLink connects people with essential support services
              available in their community.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Shelter */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm hover:shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                🏠
              </div>

              <h3 className="mt-5 text-xl font-bold">Shelter</h3>

              <p className="mt-3 text-gray-600">
                Find nearby temporary shelters and available beds.
              </p>

              <button className="mt-5 font-semibold text-green-700">
                Find Shelter →
              </button>
            </div>

            {/* Food */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm hover:shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                🍲
              </div>

              <h3 className="mt-5 text-xl font-bold">Food</h3>

              <p className="mt-3 text-gray-600">
                Locate food providers and request available meals.
              </p>

              <button className="mt-5 font-semibold text-green-700">
                Find Food →
              </button>
            </div>

            {/* Medical */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm hover:shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                🏥
              </div>

              <h3 className="mt-5 text-xl font-bold">Medical</h3>

              <p className="mt-3 text-gray-600">
                Get healthcare information and medical assistance.
              </p>

              <button className="mt-5 font-semibold text-green-700">
                Get Medical Help →
              </button>
            </div>

            {/* Volunteer */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm hover:shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                🤝
              </div>

              <h3 className="mt-5 text-xl font-bold">Volunteer</h3>

              <p className="mt-3 text-gray-600">
                Help people in need by volunteering in your community.
              </p>

              <button className="mt-5 font-semibold text-green-700">
                Become a Volunteer →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FIND HELP */}
      <section id="find-help" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-wider text-green-700">
              Find Support
            </p>

            <h2 className="mt-3 text-4xl font-bold">Find help near you</h2>

            <p className="mt-5 leading-7 text-gray-600">
              Search for nearby shelters, food providers, healthcare
              organizations and other community resources.
            </p>

            <div className="mt-8 flex overflow-hidden rounded-full border shadow-sm">
              <input
                type="text"
                placeholder="Enter your location..."
                className="flex-1 px-6 py-4 outline-none"
              />

              <button className="bg-green-700 px-7 font-semibold text-white hover:bg-green-800">
                Search
              </button>
            </div>
          </div>

          <div className="flex h-80 items-center justify-center rounded-3xl bg-gray-200">
            <div className="text-center">
              <div className="text-6xl">📍</div>

              <h3 className="mt-3 text-xl font-bold">Find Services Near You</h3>

              <p className="mt-2 text-gray-500">
                Interactive map will be added later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section
        id="donate"
        className="bg-green-800 px-6 py-20 text-center text-white"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold">You can make a difference</h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-green-100">
            Your support can help provide food, shelter, medicine and other
            essential services to people in need.
          </p>

          <button
            onClick={() => navigate("/donate")}
            className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-green-800 hover:bg-gray-100"
          >
            Donate Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 px-6 py-12 text-gray-300">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-3xl font-black text-white">
              Shelter<span className="text-green-500">Link</span>
            </h2>

            <p className="mt-4 max-w-sm">
              Connecting people to safety, shelter and support.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3">
              <a href="#home" className="hover:text-white">
                Home
              </a>

              <a href="#services" className="hover:text-white">
                Services
              </a>

              <a href="#find-help" className="hover:text-white">
                Find Help
              </a>

              <a href="#donate" className="hover:text-white">
                Donate
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Get Involved</h3>

            <div className="mt-4 flex flex-col gap-3">
              <a href="#">Become a Volunteer</a>

              <a href="#">Partner With Us</a>

              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-6 text-sm">
          © 2026 ShelterLink. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;

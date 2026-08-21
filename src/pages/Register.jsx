import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= NAVBAR ================= */}
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

          {/* Home Button */}
          <Link
            to="/"
            className="rounded-full px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Home
          </Link>
        </div>
      </header>

      {/* ================= REGISTRATION SECTION ================= */}
      <main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
          {/* Heading */}
          <div className="text-center">
            <p className="font-semibold uppercase tracking-wider text-green-700">
              Join ShelterLink
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="mt-3 text-gray-600">
              Register to access ShelterLink services and support.
            </p>
          </div>

          {/* Registration Form */}
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="mb-2 block font-semibold text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Confirm Password */}
            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800"
            >
              Register
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 border-t border-gray-200 pt-6 text-center">
            <p className="text-gray-600">Already have an account?</p>

            <Link
              to="/login"
              className="mt-3 inline-block rounded-full border-2 border-green-700 px-7 py-3 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
            >
              Login
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-500 hover:text-green-700"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 px-6 py-8 text-center text-gray-300">
        <p>© 2026 ShelterLink. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Register;

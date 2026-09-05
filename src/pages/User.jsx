import { Link, useNavigate } from "react-router-dom";

function User() {
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

          {/* Navigation */}
          <nav className="flex items-center gap-4">

            <Link
              to="/"
              className="rounded-full px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>

            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              Logout
            </button>

          </nav>

        </div>
      </header>


      {/* ================= USER PROFILE ================= */}
      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* Welcome */}
        <div className="rounded-3xl bg-green-800 p-8 text-white shadow-lg">

          <p className="font-semibold uppercase tracking-wider text-green-200">
            Welcome to ShelterLink
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Hello, User!
          </h2>

          <p className="mt-3 max-w-2xl text-green-100">
            Manage your account and access ShelterLink services from your
            personal dashboard.
          </p>

        </div>


        {/* ================= PROFILE & QUICK ACTIONS ================= */}
        <div className="mt-8 grid gap-8 md:grid-cols-3">

          {/* Profile */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl">
              👤
            </div>

            <div className="mt-6 text-center">

              <h3 className="text-2xl font-bold text-gray-900">
                User Name
              </h3>

              <p className="mt-2 text-gray-600">
                user@example.com
              </p>

            </div>

            <button
              className="mt-6 w-full rounded-full border-2 border-green-700 px-6 py-3 font-semibold text-green-700 hover:bg-green-700 hover:text-white"
            >
              Edit Profile
            </button>

          </div>


          {/* Find Help */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              🆘
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Find Help
            </h3>

            <p className="mt-3 text-gray-600">
              Find nearby shelters, food providers, healthcare services and
              other community resources.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-full bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              Find Support
            </Link>

          </div>


          {/* Donate */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              ❤️
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Support Others
            </h3>

            <p className="mt-3 text-gray-600">
              Your contribution can help provide food, shelter, medicine and
              essential support to people in need.
            </p>

            <Link
              to="/donate"
              className="mt-6 inline-block rounded-full bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              Donate Now
            </Link>

          </div>

        </div>


        {/* ================= ACCOUNT INFORMATION ================= */}
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm">

          <h3 className="text-2xl font-bold">
            Account Information
          </h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Full Name
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                User Name
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Email Address
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                user@example.com
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Account Type
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                Community Member
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Member Since
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                2026
              </p>
            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 px-6 py-8 text-center text-gray-300">

        <p>
          © 2026 ShelterLink. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default User;
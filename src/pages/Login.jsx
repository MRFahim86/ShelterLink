import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Login successful!");

      console.log(data);

      navigate("/user");

    } catch (error) {
      console.log(error);
      setMessage("Cannot connect to server");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Shelter<span className="text-green-700">Link</span>
            </h1>

            <p className="text-sm italic text-gray-500">
              connecting people to safety, shelter and support
            </p>
          </div>

          <Link
            to="/"
            className="rounded-full px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Home
          </Link>

        </div>
      </header>

      {/* Login Section */}
      <main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-wider text-green-700">
              Welcome Back
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Login
            </h2>

            <p className="mt-3 text-gray-600">
              Login to your ShelterLink account to continue.
            </p>

          </div>

          {/* Login Form */}
          <form
            className="mt-8"
            onSubmit={handleLogin}
          >

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Message */}
            {message && (
              <p className="mt-4 text-center font-semibold text-green-700">
                {message}
              </p>
            )}

          </form>

          {/* Register */}
          <div className="mt-7 border-t border-gray-200 pt-6 text-center">

            <p className="text-gray-600">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="mt-3 inline-block rounded-full border-2 border-green-700 px-7 py-3 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
            >
              Register
            </Link>

          </div>

          {/* Back to Donate */}
          <div className="mt-6 text-center">

            <Link
              to="/donate"
              className="text-sm font-semibold text-gray-500 hover:text-green-700"
            >
              ← Back to Donate
            </Link>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-950 px-6 py-8 text-center text-gray-300">

        <p>
          © 2026 ShelterLink. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Login;
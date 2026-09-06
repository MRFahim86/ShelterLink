import { useState } from "react";
import { Link } from "react-router-dom";

function Donate() {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Quick donation amounts
  const quickAmounts = [100, 500, 1000];

  // Select quick amount
  const handleQuickAmount = (value) => {
    setAmount(value.toString());
    setError("");
  };

  // Submit donation
  const handleSubmit = (e) => {
    e.preventDefault();

    const donationAmount = Number(amount);

    // Amount validation
    if (!amount || donationAmount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    // Purpose validation
    if (!purpose) {
      setError("Please select a donation purpose.");
      return;
    }

    // Success
    setError("");
    setSuccess(true);
  };

  // Reset form
  const handleReset = () => {
    setAmount("");
    setPurpose("");
    setError("");
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}

      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Logo */}

          <Link to="/" className="block">
            <div className="text-3xl font-bold tracking-tight">
              <span className="text-black">Shelter</span>
              <span className="text-green-700">Link</span>
            </div>

            <p className="text-sm text-gray-500 italic">
              connecting people to safety, shelter and support
            </p>
          </Link>

          {/* Back */}

          <Link
            to="/"
            className="text-gray-800 font-semibold hover:text-green-700"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="text-center py-16 px-6">
        <p className="text-green-700 font-bold tracking-wide text-lg">
          MAKE A DIFFERENCE
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
          Support Someone in Need
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto mt-5 leading-relaxed">
          Your contribution can help provide food, shelter, healthcare and
          essential support to people in vulnerable situations.
        </p>
      </section>

      {/* ================= DONATION TYPES ================= */}

      <section className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Food */}

          <button
            type="button"
            onClick={() => {
              setPurpose("Food");
              setError("");
            }}
            className={`bg-white rounded-2xl border p-8 text-center shadow-sm transition hover:shadow-md ${
              purpose === "Food"
                ? "border-green-600 ring-2 ring-green-200"
                : "border-gray-200"
            }`}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
              🍲
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-6">
              Provide Food
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Help provide nutritious meals to people who need them.
            </p>
          </button>

          {/* Shelter */}

          <button
            type="button"
            onClick={() => {
              setPurpose("Shelter");
              setError("");
            }}
            className={`bg-white rounded-2xl border p-8 text-center shadow-sm transition hover:shadow-md ${
              purpose === "Shelter"
                ? "border-green-600 ring-2 ring-green-200"
                : "border-gray-200"
            }`}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
              🏠
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-6">
              Support Shelter
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Help people access safe and temporary accommodation.
            </p>
          </button>

          {/* Medical */}

          <button
            type="button"
            onClick={() => {
              setPurpose("Medical");
              setError("");
            }}
            className={`bg-white rounded-2xl border p-8 text-center shadow-sm transition hover:shadow-md ${
              purpose === "Medical"
                ? "border-green-600 ring-2 ring-green-200"
                : "border-gray-200"
            }`}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
              🏥
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-6">
              Medical Support
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Help provide essential healthcare and medical assistance.
            </p>
          </button>
        </div>
      </section>

      {/* ================= DONATION FORM ================= */}

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-green-800 rounded-3xl p-8 md:p-12">
          {!success ? (
            <>
              <div className="text-center text-white mb-8">
                <h2 className="text-3xl font-bold">
                  Ready to make a difference?
                </h2>

                <p className="mt-3 text-green-100">
                  Choose your donation purpose and amount.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl mx-auto"
              >
                {/* Donation Purpose */}

                <label className="block font-semibold text-gray-800 mb-2">
                  Donation Purpose
                </label>

                <select
                  value={purpose}
                  onChange={(e) => {
                    setPurpose(e.target.value);
                    setError("");
                  }}
                  className="w-full border rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select purpose</option>

                  <option value="Food">Provide Food</option>

                  <option value="Shelter">Support Shelter</option>

                  <option value="Medical">Medical Support</option>
                </select>

                {/* Amount */}

                <label className="block font-semibold text-gray-800 mb-3">
                  Donation Amount
                </label>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {quickAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleQuickAmount(value)}
                      className={`py-3 rounded-lg font-bold border transition ${
                        amount === value.toString()
                          ? "bg-green-700 text-white border-green-700"
                          : "bg-white text-green-700 border-green-300 hover:bg-green-50"
                      }`}
                    >
                      ৳{value}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}

                <input
                  type="number"
                  min="1"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError("");
                  }}
                  className="w-full border rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Error */}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-5 text-sm">
                    ⚠️ {error}
                  </div>
                )}

                {/* Selected Donation Summary */}

                {amount && purpose && (
                  <div className="bg-green-50 rounded-lg p-4 mb-5">
                    <p className="text-gray-700">
                      Donation:
                      <span className="font-bold ml-2">৳{amount}</span>
                    </p>

                    <p className="text-gray-700 mt-1">
                      Purpose:
                      <span className="font-bold ml-2">{purpose}</span>
                    </p>
                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition"
                >
                  Donate Now
                </button>
              </form>
            </>
          ) : (
            /* ================= SUCCESS ================= */

            <div className="bg-white rounded-2xl p-10 text-center max-w-2xl mx-auto">
              <div className="text-6xl mb-5">🎉</div>

              <h2 className="text-3xl font-bold text-green-700">
                Thank You!
              </h2>

              <p className="text-gray-700 text-lg mt-4">
                Your donation request has been recorded successfully.
              </p>

              <div className="bg-green-50 rounded-xl p-5 mt-6 text-left">
                <p className="text-gray-700">
                  <strong>Amount:</strong> ৳{amount}
                </p>

                <p className="text-gray-700 mt-2">
                  <strong>Purpose:</strong> {purpose}
                </p>
              </div>

              <p className="text-gray-500 text-sm mt-5">
                In the final version, this donation can be connected to a
                payment gateway and backend database.
              </p>

              <button
                onClick={handleReset}
                className="mt-6 bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800"
              >
                Make Another Donation
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Donate;
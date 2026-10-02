import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DonationInfo() {
  const [donations, setDonations] = useState([]);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getDonations = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/donations/my",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          setLoggedIn(false);
          setCheckingLogin(false);
          return;
        }

        const data = await response.json();

        setDonations(data);
        setLoggedIn(true);
      } catch (error) {
        console.error("Donation information error:", error);
        setLoggedIn(false);
      } finally {
        setCheckingLogin(false);
      }
    };

    getDonations();
  }, []);

  // Logged-out user sees nothing
  if (!checkingLogin && !loggedIn) {
    return null;
  }

  if (checkingLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}

      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="block">
            <div className="text-3xl font-bold tracking-tight">
              <span className="text-black">Shelter</span>
              <span className="text-green-700">Link</span>
            </div>

            <p className="text-sm text-gray-500 italic">
              connecting people to safety, shelter and support
            </p>
          </Link>

          <Link
            to="/user"
            className="text-gray-800 font-semibold hover:text-green-700"
          >
            Back to User Page
          </Link>
        </div>
      </header>

      {/* ================= CONTENT ================= */}

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <p className="text-green-700 font-bold tracking-wide">
            DONATION INFORMATION
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-3">
            My Donations
          </h1>

          <p className="text-gray-600 mt-4">
            View the donations you have made through ShelterLink.
          </p>
        </div>

        {donations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <div className="text-5xl">💝</div>

            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              No Donations Yet
            </h2>

            <p className="text-gray-600 mt-3">
              You have not made any donations yet.
            </p>

            <Link
              to="/donate"
              className="inline-block mt-6 bg-green-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800"
            >
              Make a Donation
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    Donation
                  </h2>

                  <span className="text-sm text-gray-500">
                    {new Date(donation.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Amount
                    </p>

                    <p className="text-lg font-bold text-green-700 mt-1">
                      ৳{donation.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Purpose
                    </p>

                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {donation.purpose}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Payment Method
                    </p>

                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {donation.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Account Number
                    </p>

                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {donation.accountNumber}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="bg-gray-950 px-6 py-8 text-center text-gray-300">
        <p>© 2026 ShelterLink. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DonationInfo;
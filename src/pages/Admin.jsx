import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/help/admin",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);

        if (response.status === 401 || response.status === 403) {
          navigate("/");
        }

        return;
      }

      setRequests(data);

    } catch (error) {
      console.log(error);
      setMessage("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:4000/help/admin/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setRequests((previous) =>
        previous.map((request) =>
          request._id === id
            ? {
                ...request,
                status: data.request.status,
              }
            : request
        )
      );

    } catch (error) {
      console.log(error);
      alert("Cannot connect to server");
    }
  };

  const deleteRequest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/help/admin/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setRequests((previous) =>
        previous.filter((request) => request._id !== id)
      );

    } catch (error) {
      console.log(error);
      alert("Cannot connect to server");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost:4000/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl font-bold text-green-700"
          >
            ShelterLink
          </Link>

          <div className="flex items-center gap-4">

            <Link
              to="/"
              className="rounded-full px-5 py-2 text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-full bg-green-700 px-5 py-2 font-semibold text-white hover:bg-green-800"
            >
              Logout
            </button>

          </div>
        </div>
      </header>


      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">

          <p className="font-semibold uppercase tracking-wider text-green-700">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Help Requests
          </h1>

          <p className="mt-3 text-gray-600">
            View and manage help requests submitted by users.
          </p>

        </div>


        {/* Total */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">
              Total Requests
            </p>

            <p className="mt-2 text-4xl font-bold text-gray-900">
              {requests.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-4xl font-bold text-yellow-600">
              {
                requests.filter(
                  (request) => request.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">
              Resolved
            </p>

            <p className="mt-2 text-4xl font-bold text-green-600">
              {
                requests.filter(
                  (request) => request.status === "Resolved"
                ).length
              }
            </p>
          </div>

        </div>


        {/* Requests */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">
              User Help Requests
            </h2>
          </div>


          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading requests...
            </div>
          ) : requests.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No help requests found.
            </div>
          ) : (
            <div className="divide-y">

              {requests.map((request) => (

                <div
                  key={request._id}
                  className="p-6"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">

                    {/* Request Information */}
                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-bold text-gray-900">
                          {request.name}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            request.status === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {request.status}
                        </span>

                      </div>

                      <p className="mt-2 text-gray-600">
                        📞 {request.phone}
                      </p>

                      <p className="mt-4 text-gray-800">
                        {request.message}
                      </p>

                      <p className="mt-4 text-sm text-gray-400">
                        {new Date(
                          request.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>


                    {/* Actions */}
                    <div className="flex flex-wrap items-start gap-3">

                      {request.status === "Pending" ? (
                        <button
                          onClick={() =>
                            updateStatus(
                              request._id,
                              "Resolved"
                            )
                          }
                          className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateStatus(
                              request._id,
                              "Pending"
                            )
                          }
                          className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white hover:bg-yellow-600"
                        >
                          Mark Pending
                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteRequest(request._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

          {message && (
            <p className="p-6 text-center text-red-600">
              {message}
            </p>
          )}

        </div>

      </main>

    </div>
  );
}

export default Admin;
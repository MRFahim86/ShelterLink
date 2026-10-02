import React, { useState } from "react";

const Help = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your help request has been submitted!");

    setFormData({
      name: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Help Section */}
      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
            Need Help?
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Tell us what kind of help you need.
            We are here to support you.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Name */}
            <label className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Phone */}
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Help message */}
            <label className="block text-gray-700 font-medium mb-2">
              What do you need help with?
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write what kind of help you need..."
              required
              rows="6"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Request
            </button>

          </form>

          {/* Contact information */}
          <div className="border-t mt-8 pt-6 text-center">

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Need Immediate Help?
            </h2>

            <p className="text-gray-600 mb-3">
              You can contact us directly:
            </p>

            <a
              href="tel:01XXXXXXXXX"
              className="text-green-600 text-xl font-bold"
            >
              📞 01XXXXXXXXX
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Help;
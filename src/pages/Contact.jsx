import React from "react";

const Contact = () => {
  const members = [
    {
      name: "Mahfuzur Rahman",
      email: "mahafuzur.cse.00724105101086@aust.edu",
    },
    {
      name: "Turjay Paul",
      email: "turjay.2004@gmail.com",
    },
    {
      name: "Fairuz Anika",
      email: "fairuz.cse.00724105101095@aust.edu",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Contact Us
          </h1>

          <p className="mt-3 text-gray-600">
            Have any questions or need help? Feel free to contact us.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid gap-6 md:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.email}
              className="rounded-2xl bg-white p-6 text-center shadow-md"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
                {member.name.charAt(0)}
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h2>

              <a
                href={`mailto:${member.email}`}
                className="mt-3 block break-all text-sm text-green-600 hover:underline"
              >
                {member.email}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">
            We are here to help
          </h2>

          <p className="mt-2 text-gray-600">
            Click on any email above to contact us directly.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
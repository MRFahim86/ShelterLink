function Donate() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
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

          <a
            href="/"
            className="rounded-full px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Back to Home
          </a>

        </div>
      </header>


      {/* ================= DONATE CONTENT ================= */}
      <main className="px-6 py-16">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-wider text-green-700">
              Make a Difference
            </p>

            <h2 className="mt-3 text-5xl font-bold text-gray-900">
              Support Someone in Need
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Your contribution can help provide food, shelter, healthcare
              and essential support to people in vulnerable situations.
            </p>

          </div>


          {/* Donation Options */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                🍲
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Provide Food
              </h3>

              <p className="mt-3 text-gray-600">
                Help provide nutritious meals to people who need them.
              </p>
            </div>


            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                🏠
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Support Shelter
              </h3>

              <p className="mt-3 text-gray-600">
                Help people access safe and temporary accommodation.
              </p>
            </div>


            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                🏥
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Medical Support
              </h3>

              <p className="mt-3 text-gray-600">
                Help provide essential healthcare and medical assistance.
              </p>
            </div>

          </div>


          {/* Donation Action */}
          <div className="mt-12 rounded-3xl bg-green-800 px-6 py-12 text-center text-white">

            <h3 className="text-3xl font-bold">
              Ready to make a difference?
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-green-100">
              Please log in before continuing with your donation.
            </p>

            <a
              href="/login"
              className="mt-8 inline-block rounded-full bg-white px-10 py-4 font-semibold text-green-800 hover:bg-gray-100"
            >
              Continue to Login
            </a>

          </div>

        </div>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 px-6 py-10 text-center text-gray-300">

        <h2 className="text-3xl font-black text-white">
          Shelter<span className="text-green-500">Link</span>
        </h2>

        <p className="mt-3">
          Connecting people to safety, shelter and support.
        </p>

        <div className="mt-6 border-t border-gray-800 pt-6 text-sm">
          © 2026 ShelterLink. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Donate;
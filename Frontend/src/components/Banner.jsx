import React from 'react';

function Banner() {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center my-16">

        {/* Left Section - Text & CTA */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold leading-tight">
            Test Your IQ & <span className="text-yellow-400">Unleash Your Genius!</span>
          </h1>
          <p className="text-xl text-red-500 font-serif font-bold mt-6">
            Ready to challenge yourself ? Take our fun & insightful IQ test now and discover your potential!
          </p>

          {/* CTA Button */}
          <div className="mt-8 relative">
            <a href="/iq-test">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 relative overflow-hidden flex items-center gap-3">
              Start Your Test
              <span className="text-xl animate-bounce-right">➡️</span>
            </button>
            </a>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img 
            src="/public/lp-banner-img.png" 
            className="w-[450px] h-auto drop-shadow-xl animate-pulse" 
            alt="IQ Test Banner" 
          />
        </div>

      </div>

      {/* 🔥 New IQ Facts & Benefits Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Test Your IQ? 🤔
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            IQ tests help you understand your cognitive strengths, problem-solving skills, and potential!
          </p>

          {/* IQ Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

            {/* Card 1 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
              <img src="https://cdn-icons-png.flaticon.com/512/2891/2891593.png" className="w-16 mx-auto" alt="Brain Boost" />
              <h3 className="text-xl font-semibold mt-4">Boost Your Brainpower</h3>
              <p className="text-gray-600 mt-2">Train your mind and improve cognitive skills.</p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135783.png" className="w-16 mx-auto" alt="Challenge Yourself" />
              <h3 className="text-xl font-semibold mt-4">Challenge Yourself</h3>
              <p className="text-gray-600 mt-2">Find out how well you perform in logic and reasoning.</p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
              <img src="https://cdn-icons-png.flaticon.com/512/2026/2026507.png" className="w-16 mx-auto" alt="Career Insights" />
              <h3 className="text-xl font-semibold mt-4">Discover Your Potential</h3>
              <p className="text-gray-600 mt-2">See how your IQ relates to different career paths.</p>
            </div>

          </div>

          {/* Call to Action */}
          {/* <div className="mt-12">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300">
              Take the IQ Test Now! 🚀
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Banner;

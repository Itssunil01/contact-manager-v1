import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Welcome() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#F0FFFF] text-center px-4">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Welcome
          </h1>
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-700">
            Start Collecting Your Contacts
          </h3>
        </div>

        <div className="mt-8">
          <a href="/signup">
            <button className="flex items-center justify-center h-10 sm:h-12 w-32 sm:w-40 text-lg sm:text-xl text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded-full shadow-md">
              Get Started
              <ChevronRightIcon className="ml-1" />
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Welcome;

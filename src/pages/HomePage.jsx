import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-10">
        Welcome to Rayat Kutumb Kalyan Yojana
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Scheme 1 Card */}
        <div
          onClick={() => handleNavigate("/scheme1")}
          className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center border-2 border-green-200 hover:border-green-500"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Rayat Kutumb Kalyan Yojana
          </h2>
          <p className="text-gray-600">
            Discover the benefits and features of the Rayat Kutumb Kalyan
            Yojana.
          </p>
        </div>

        {/* Scheme 2 Card */}
        <div
          onClick={() => handleNavigate("/scheme2")}
          className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center border-2 border-green-200 hover:border-green-500"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Rayat Welfare fund Scheme
          </h2>
          <p className="text-gray-600">
            Explore the Rayat Welfare fund Scheme and its offerings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

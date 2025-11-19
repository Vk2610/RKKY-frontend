import React from "react";
import { useNavigate } from "react-router-dom";

const Scheme2Page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-8">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-2xl p-10 text-center border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Scheme 2 - Rayat Welfare fund Scheme
        </h1>
        <p className="text-gray-700 mb-6">
          Welcome to the Rayat Welfare fund Scheme page. Here you can find all
          the information about the Rayat Welfare fund Scheme.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-all duration-300"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Scheme2Page;

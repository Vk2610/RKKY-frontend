// function HomePage() {
//   return (
//     <div className="h-screen bg-blue-50 p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
//       <div className="w-full md:w-80 p-6 bg-white rounded-[25px] shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//             1
//           </div>
//           <h2 className="text-xl font-bold text-gray-800">Card One</h2>
//         </div>
//         <p className="text-gray-600">
//           This is the first card with a nice shadow effect and smooth animation.
//         </p>
//       </div>

//       <div className="w-full md:w-80 p-6 bg-white rounded-[25px] shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up animation-delay-300">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
//             2
//           </div>
//           <h2 className="text-xl font-bold text-gray-800">Card Two</h2>
//         </div>
//         <p className="text-gray-600">
//           This is the second card with a delayed animation entrance.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

export function Scheme1Page() {
  return (
    <div className="h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Scheme 1 Details
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Benefits</h2>
        <p className="text-gray-600">
          Details about scheme 1 benefits and eligibility...
        </p>
      </div>
    </div>
  );
}

export function Scheme2Page() {
  return (
    <div className="h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Scheme 2 Details
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Benefits</h2>
        <p className="text-gray-600">
          Details about scheme 2 benefits and eligibility...
        </p>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-blue-50 p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
      <div
        onClick={() => navigate("/scheme1")}
        className="w-full md:w-80 p-6 bg-white rounded-[25px] shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up cursor-pointer"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            1
          </div>
          <h2 className="text-xl font-bold text-gray-800">Scheme One</h2>
        </div>
        <p className="text-gray-600">
          Click to view details about our first scheme and its benefits.
        </p>
      </div>

      <div
        onClick={() => navigate("/scheme2")}
        className="w-full md:w-80 p-6 bg-white rounded-[25px] shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up animation-delay-300 cursor-pointer"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            2
          </div>
          <h2 className="text-xl font-bold text-gray-800">Scheme Two</h2>
        </div>
        <p className="text-gray-600">
          Click to view details about our second scheme and its benefits.
        </p>
      </div>
    </div>
  );
}

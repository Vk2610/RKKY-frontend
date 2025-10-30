import { FaBars, FaUser } from "react-icons/fa";

function ProfileNavbar() {
  const initial = true;
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-blue-400 shadow-md position-sticky top-0 z-50">
      <button className="p-2 rounded-full transition-colors">
        <FaBars className="w-6 h-6 text-white" />
      </button>

      {initial ? (
        <button className="w-10 h-10 rounded-full bg-white text-blue-500 text-xl font-semibold flex items-center justify-center border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white transition-all">
          VK
        </button>
      ) : (
        <button className="p-2 bg-white rounded-full transition-all border-2 border-white hover:border-white hover:bg-transparent">
          <FaUser className="w-6 h-6 text-blue-500 hover:text-white transition-colors" />
        </button>
      )}
    </nav>
  );
}

export default ProfileNavbar;

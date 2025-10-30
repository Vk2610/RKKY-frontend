import { GoSignOut } from "react-icons/go";

export default function SignOutButton() {
  return (
    <button
      className="flex items-center justify-center gap-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium"
    >
      <GoSignOut className="w-5 h-5" />
      <span>Sign Out</span>
    </button>
  );
}

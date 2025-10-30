export default function AuthButton({ buttonName }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
    >
      {buttonName}
    </button>
  );
}

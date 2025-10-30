function HomePage() {
  return (
    <div className="h-screen bg-blue-50 p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
      <div className="w-full md:w-80 p-6 bg-white rounded-[25px] shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            1
          </div>
          <h2 className="text-xl font-bold text-gray-800">Card One</h2>
        </div>
        <p className="text-gray-600">
          This is the first card with a nice shadow effect and smooth animation.
        </p>
      </div>

      <div className="w-full md:w-80 p-6 bg-white rounded-[25px] shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up animation-delay-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            2
          </div>
          <h2 className="text-xl font-bold text-gray-800">Card Two</h2>
        </div>
        <p className="text-gray-600">
          This is the second card with a delayed animation entrance.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
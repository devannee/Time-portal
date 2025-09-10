export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Tailwind CSS Test</h1>
        <p className="text-gray-600 mb-4">If you can see this styled properly, Tailwind is working!</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500 p-4 rounded text-white">Green</div>
          <div className="bg-pink-500 p-4 rounded text-white">Pink</div>
        </div>
        <button className="w-full mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
          Test Button
        </button>
      </div>
    </div>
  );
}

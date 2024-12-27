const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="mt-4 text-lg text-white font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;

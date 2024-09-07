// components/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Spinner container */}
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-solid border-gray-300 border-t-blue-500"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default LoadingSpinner;

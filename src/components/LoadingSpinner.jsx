// components/LoadingSpinner.jsx
const LoadingSpinner = () => (
  <div
    data-testid="loading-spinner"
    className="flex min-h-screen items-center justify-center"
  >
    <div
      aria-label="Loading"
      className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-solid border-gray-300 border-t-blue-500"
      role="status"
    />
  </div>
);

export default LoadingSpinner;

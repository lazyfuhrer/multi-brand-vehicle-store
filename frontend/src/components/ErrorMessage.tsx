interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 max-w-md w-full">
        <div className="flex items-center mb-3 sm:mb-4">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-base sm:text-lg font-semibold text-red-800">Error</h3>
        </div>
        <p className="text-sm sm:text-base text-red-700 mb-3 sm:mb-4">{message || 'Something went wrong. Please try again.'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-red-600 text-white px-4 py-2.5 sm:py-2 rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

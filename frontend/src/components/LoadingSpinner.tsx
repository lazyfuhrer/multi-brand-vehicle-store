interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12">
      <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-turno-primary mb-3 sm:mb-4"></div>
      <p className="text-gray-600 text-base sm:text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

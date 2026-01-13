import { ReactNode } from 'react';

interface EmptyStateProps {
  message?: string;
  description?: string;
  icon?: ReactNode;
}

const EmptyState = ({ message = 'No items found', description, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
      <div className="text-gray-400 mb-4">
        {icon || (
          <svg
            className="h-12 w-12 sm:h-16 sm:w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 text-center">{message}</h3>
      {description && (
        <p className="text-sm sm:text-base text-gray-500 text-center max-w-md px-4">{description}</p>
      )}
    </div>
  );
};

export default EmptyState;

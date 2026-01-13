import { VehicleFilters, PaginationInfo } from '../types';

interface PaginationProps {
  pagination: PaginationInfo | null;
  onPageChange: (page: number, filters: VehicleFilters) => void;
  filters?: VehicleFilters;
  currentPage?: number;
}

const Pagination = ({ pagination, onPageChange, filters = {}, currentPage = 1 }: PaginationProps) => {
  if (!pagination || (!pagination.next && !pagination.previous)) {
    return null;
  }

  const handlePageChange = (page: number): void => {
    if (page < 1) return;
    onPageChange(page, filters);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 mb-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!pagination.previous}
        className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
          pagination.previous
            ? 'bg-turno-primary text-white hover:bg-turno-primary-dark'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Previous
      </button>
      
      <span className="text-sm sm:text-base text-gray-700 font-medium text-center">
        Page {currentPage} of {Math.ceil(pagination.count / 10)}
      </span>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!pagination.next}
        className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
          pagination.next
            ? 'bg-turno-primary text-white hover:bg-turno-primary-dark'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

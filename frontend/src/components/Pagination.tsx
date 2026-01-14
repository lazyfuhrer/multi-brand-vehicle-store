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
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!pagination.previous}
        className={`w-full sm:w-auto px-6 py-3 rounded-xl text-base font-semibold transition-all ${
          pagination.previous
            ? 'bg-gradient-to-r from-turno-primary to-turno-primary-dark text-white hover:shadow-lg hover:shadow-turno-primary/30 transform hover:-translate-y-0.5'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Previous
      </button>
      
      <span className="text-base sm:text-lg text-gray-700 font-semibold text-center px-4 py-2 bg-white rounded-xl shadow-sm">
        Page {currentPage} of {Math.ceil(pagination.count / 10)}
      </span>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!pagination.next}
        className={`w-full sm:w-auto px-6 py-3 rounded-xl text-base font-semibold transition-all ${
          pagination.next
            ? 'bg-gradient-to-r from-turno-primary to-turno-primary-dark text-white hover:shadow-lg hover:shadow-turno-primary/30 transform hover:-translate-y-0.5'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

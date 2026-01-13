import { useState, useEffect } from 'react';
import { PaginatedResponse, VehicleFilters } from '../types';

interface UsePaginatedDataReturn<T> {
  data: T[];
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  } | null;
  loading: boolean;
  error: string | null;
  filters: VehicleFilters;
  currentPage: number;
  handlePageChange: (page: number, newFilters?: VehicleFilters) => void;
  handleFilterChange: (newFilters: VehicleFilters) => void;
  refetch: () => void;
}

const usePaginatedData = <T,>(
  fetchFunction: (params: Record<string, string | number>) => Promise<PaginatedResponse<T>>,
  initialFilters: VehicleFilters = {}
): UsePaginatedDataReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = async (page: number = 1, currentFilters: VehicleFilters = filters): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const params: Record<string, string | number> = {
        page,
        ...currentFilters,
      };
      
      const response = await fetchFunction(params);
      
      setData(response.results || []);
      setPagination({
        count: response.count,
        next: response.next,
        previous: response.previous,
      });
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setData([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (page: number, newFilters: VehicleFilters = filters): void => {
    setFilters(newFilters);
    fetchData(page, newFilters);
  };

  const handleFilterChange = (newFilters: VehicleFilters): void => {
    setFilters(newFilters);
    fetchData(1, newFilters);
  };

  return {
    data,
    pagination,
    loading,
    error,
    filters,
    currentPage,
    handlePageChange,
    handleFilterChange,
    refetch: () => fetchData(currentPage, filters),
  };
};

export default usePaginatedData;

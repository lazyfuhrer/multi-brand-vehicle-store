import { getVehicles } from '../services/api';
import usePaginatedData from '../hooks/usePaginatedData';
import Container from '../components/Container';
import ResponsiveGrid from '../components/ResponsiveGrid';
import VehicleCard from '../components/VehicleCard';
import VehicleFilters from '../components/VehicleFilters';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Vehicle } from '../types';

const VehicleList = () => {
  const {
    data: vehicles,
    pagination,
    loading,
    error,
    filters,
    currentPage,
    handlePageChange,
    handleFilterChange,
    refetch,
  } = usePaginatedData<Vehicle>(getVehicles);

  if (loading && vehicles.length === 0) {
    return (
      <Container>
        <LoadingSpinner message="Loading vehicles..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage message={error} onRetry={refetch} />
      </Container>
    );
  }

  return (
    <Container className="py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Vehicle Store</h1>
        <p className="text-sm sm:text-base text-gray-600">Browse our collection of vehicles</p>
      </div>

      <VehicleFilters
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      {vehicles.length === 0 ? (
        <EmptyState
          message="No vehicles found"
          description="Try adjusting your filters to see more results."
        />
      ) : (
        <>
          <ResponsiveGrid>
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </ResponsiveGrid>

          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            filters={filters}
            currentPage={currentPage}
          />
        </>
      )}
    </Container>
  );
};

export default VehicleList;

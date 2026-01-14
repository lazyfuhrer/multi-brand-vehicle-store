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
    <Container className="py-6 sm:py-8 lg:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Discover Your Perfect Vehicle
        </h1>
        <p className="text-base sm:text-lg text-gray-600">Explore our curated collection of premium vehicles</p>
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

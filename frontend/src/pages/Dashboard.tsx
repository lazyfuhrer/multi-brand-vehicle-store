import { useState, useEffect } from 'react';
import { getVehicleSummary } from '../services/api';
import Container from '../components/Container';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessageComponent from '../components/ErrorMessage';
import { VehicleSummary } from '../types';

const Dashboard = () => {
  const [summary, setSummary] = useState<VehicleSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalVehicles, setTotalVehicles] = useState<number>(0);

  useEffect(() => {
    const fetchSummary = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const data = await getVehicleSummary();
        setSummary(data);
        
        // Calculate total turnos
        const total = data.reduce((sum, item) => sum + item.total, 0);
        setTotalVehicles(total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner message="Loading dashboard..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessageComponent
          message={error}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Vehicle statistics by brand</p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-turno-primary to-turno-primary-dark rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8 text-white">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Total Vehicles</h2>
        <p className="text-3xl sm:text-4xl font-bold">{totalVehicles}</p>
      </div>

      {/* Brand Statistics */}
      <div className="bg-turno-card-bg rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-turno-primary-light border-b border-turno-primary-light">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Vehicles by Brand</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-turno-primary-light">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visual
                </th>
              </tr>
            </thead>
            <tbody className="bg-turno-card-bg divide-y divide-gray-200">
              {summary.map((item, index) => {
                const percentage = totalVehicles > 0 
                  ? ((item.total / totalVehicles) * 100).toFixed(1) 
                  : 0;
                
                return (
                  <tr key={index} className="hover:bg-turno-bg-subtle">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.brand}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">
                        {item.total}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {percentage}%
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 max-w-xs">
                        <div
                          className="bg-turno-primary h-3 sm:h-4 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="sm:hidden text-xs text-gray-600 mt-1">{percentage}%</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Grid View (Alternative) */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Brand Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {summary.map((item, index) => {
            const percentage = totalVehicles > 0 
              ? ((item.total / totalVehicles) * 100).toFixed(1) 
              : 0;
            
            return (
              <div
                key={index}
                className="bg-turno-card-bg rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                  {item.brand}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-turno-primary mb-2">
                  {item.total}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {percentage}% of total
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-turno-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;

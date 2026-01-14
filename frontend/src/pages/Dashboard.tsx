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
      <div className="bg-gradient-to-r from-turno-primary via-turno-primary-dark to-turno-primary rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 lg:mb-10 text-white animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Total Vehicles</h2>
        <p className="text-4xl sm:text-5xl font-bold">{totalVehicles}</p>
      </div>

      {/* Brand Statistics */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-fade-in">
        <div className="px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-turno-primary-light to-white border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Vehicles by Brand</h2>
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
                className="bg-white rounded-xl shadow-md p-5 sm:p-6 hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1 animate-fade-in"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {item.brand}
                </h3>
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-turno-primary to-turno-primary-dark bg-clip-text text-transparent mb-2">
                  {item.total}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {percentage}% of total
                </p>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-turno-primary to-turno-primary-dark h-3 rounded-full transition-all duration-500"
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

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings } from '../services/api';
import { getBookingToken } from '../utils/bookingToken';
import Container from '../components/Container';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessageComponent from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import ResponsiveGrid from '../components/ResponsiveGrid';
import VehicleCard from '../components/VehicleCard';
import { Booking, Vehicle } from '../types';

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const token = getBookingToken();
        
        if (!token) {
          // No token means no bookings
          setBookings([]);
          setLoading(false);
          return;
        }
        
        const data = await getMyBookings(token);
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner message="Loading your bookings..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessageComponent message={error} onRetry={() => window.location.reload()} />
      </Container>
    );
  }

  const token = getBookingToken();
  const hasBookings = bookings.length > 0;

  return (
    <Container className="py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
            <p className="text-sm sm:text-base text-gray-600">
              {hasBookings 
                ? `${bookings.length} ${bookings.length === 1 ? 'booking' : 'bookings'}`
                : 'Your vehicle bookings will appear here'}
            </p>
          </div>
          <Link
            to="/vehicles"
            className="w-full sm:w-auto text-center px-4 py-2 bg-turno-primary text-white rounded-md hover:bg-turno-primary-dark transition-colors font-medium text-sm sm:text-base"
          >
            Browse Vehicles
          </Link>
        </div>
      </div>

      {!token ? (
        <EmptyState
          message="No booking token found"
          description="Make a booking to get started. Your bookings will be saved and accessible here."
          icon={
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />
      ) : !hasBookings ? (
        <EmptyState
          message="No bookings yet"
          description="You haven't made any bookings yet. Browse vehicles and book one to get started!"
          icon={
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />
      ) : (
        <div>
          <ResponsiveGrid>
            {bookings.map((booking) => {
              // Handle vehicle as object or ID
              const vehicle: Vehicle | null = 
                typeof booking.vehicle === 'object' && booking.vehicle !== null
                  ? booking.vehicle
                  : null;
              
              if (!vehicle) return null;
              
              return (
                <div key={booking.id} className="relative">
                  <VehicleCard vehicle={vehicle} />
                  <div className="mt-2 p-2 sm:p-3 bg-turno-primary-light rounded-md">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Booked on: {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </ResponsiveGrid>
        </div>
      )}
    </Container>
  );
};

export default MyBookings;

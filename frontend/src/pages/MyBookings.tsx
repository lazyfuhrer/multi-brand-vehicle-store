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
    <Container className="py-6 sm:py-8 lg:py-10">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">My Bookings</h1>
            <p className="text-base sm:text-lg text-gray-600">
              {hasBookings 
                ? `${bookings.length} ${bookings.length === 1 ? 'booking' : 'bookings'}`
                : 'Your vehicle bookings will appear here'}
            </p>
          </div>
          <Link
            to="/vehicles"
            className="w-full sm:w-auto text-center px-6 py-3 bg-gradient-to-r from-turno-primary to-turno-primary-dark text-white rounded-xl hover:shadow-lg hover:shadow-turno-primary/30 transition-all font-semibold text-base transform hover:-translate-y-0.5"
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
                  <div className="mt-3 p-3 bg-gradient-to-r from-turno-primary-light to-white rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-600 font-medium">
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

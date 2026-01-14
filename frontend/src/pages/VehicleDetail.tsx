import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getVehicle, createBookmark, createBooking, getBookmarks, deleteBookmark } from '../services/api';
import { saveBookingToken, getBookingToken } from '../utils/bookingToken';
import { saveBookmarkToken, getBookmarkToken } from '../utils/bookmarkToken';
import Container from '../components/Container';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessageComponent from '../components/ErrorMessage';
import { Vehicle, Bookmark, BookingFormValues } from '../types';

const bookingSchema = Yup.object({
  customer_name: Yup.string().required('Name is required'),
  customer_email: Yup.string().email('Invalid email address').required('Email is required'),
});

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkLoading, setBookmarkLoading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const turnoId = parseInt(id, 10);
        const data = await getVehicle(turnoId);
        setVehicle(data);
        
        // Check if vehicle is bookmarked
        const token = getBookmarkToken();
        if (token) {
          try {
            const bookmarks = await getBookmarks(token);
            const bookmarked = bookmarks.results?.some((b: Bookmark) => {
              const vehicleId = typeof b.vehicle === 'object' ? b.vehicle.id : b.vehicle;
              return vehicleId === data.id;
            });
            setIsBookmarked(bookmarked || false);
          } catch (err) {
            // If token is invalid, user has no bookmarks
            setIsBookmarked(false);
          }
        } else {
          setIsBookmarked(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load vehicle');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleBookmark = async (): Promise<void> => {
    if (!vehicle) return;
    
    setBookmarkLoading(true);
    try {
      const token = getBookmarkToken();
      
      if (isBookmarked) {
        // Find and delete bookmark
        if (token) {
          const bookmarks = await getBookmarks(token);
          const bookmark = bookmarks.results?.find((b: Bookmark) => {
            const vehicleId = typeof b.vehicle === 'object' ? b.vehicle.id : b.vehicle;
            return vehicleId === vehicle.id;
          });
          if (bookmark) {
            await deleteBookmark(bookmark.id);
            setIsBookmarked(false);
          }
        }
      } else {
        // Get existing token if available (to group multiple bookmarks)
        const existingToken = getBookmarkToken();
        
        const bookmark = await createBookmark({
          vehicle: vehicle.id,
          ...(existingToken && { bookmark_token: existingToken }), // Send token if exists
        });
        
        // Store the bookmark token in localStorage (use existing or new)
        if (bookmark.bookmark_token) {
          saveBookmarkToken(bookmark.bookmark_token);
        }
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleBooking = async (values: BookingFormValues, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }): Promise<void> => {
    if (!vehicle) return;
    
    try {
      setBookingError(null);
      
      // Get existing token if available (to group multiple bookings)
      const existingToken = getBookingToken();
      
      const booking = await createBooking({
        vehicle: vehicle.id,
        customer_name: values.customer_name,
        customer_email: values.customer_email,
        ...(existingToken && { booking_token: existingToken }), // Send token if exists
      });
      
      // Store the booking token in localStorage (use existing or new)
      if (booking.booking_token) {
        saveBookingToken(booking.booking_token);
      }
      
      setBookingSuccess(true);
      resetForm();
      
      // Redirect to My Bookings page after 2 seconds
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { detail?: string; message?: string } } };
        setBookingError(axiosError.response?.data?.detail || axiosError.response?.data?.message || 'Failed to create booking');
      } else {
        setBookingError('Failed to create booking');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner message="Loading vehicle details..." />
      </Container>
    );
  }

  if (error || !vehicle) {
    return (
      <Container>
        <ErrorMessageComponent
          message={error || 'Vehicle not found'}
          onRetry={() => navigate('/vehicles')}
        />
      </Container>
    );
  }

  return (
    <Container className="py-4 sm:py-6 lg:py-8">
      <Link
        to="/vehicles"
        className="inline-flex items-center text-turno-primary hover:text-turno-primary-dark mb-4 sm:mb-6 text-sm sm:text-base"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Vehicles
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in">
        <div className="flex flex-col lg:flex-row">
          {/* Vehicle Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-64 sm:h-80 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={vehicle.image_url}
                alt={`${vehicle.brand} ${vehicle.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                }}
              />
              <div className="absolute top-4 right-4">
                <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-white/90 backdrop-blur-sm text-turno-primary shadow-lg">
                  {vehicle.fuel_type}
                </span>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                {vehicle.brand} {vehicle.name}
              </h1>
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-turno-price to-turno-price-dark bg-clip-text text-transparent mb-4">
                ₹{vehicle.price.toLocaleString()}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{vehicle.description}</p>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              disabled={bookmarkLoading}
              className={`w-full mb-4 px-6 py-3 rounded-xl text-base font-semibold transition-all ${
                isBookmarked
                  ? 'bg-gradient-to-r from-turno-accent to-turno-warning text-white shadow-lg shadow-turno-accent/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${bookmarkLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md transform hover:-translate-y-0.5'}`}
            >
              {bookmarkLoading
                ? 'Loading...'
                : isBookmarked
                ? '★ Bookmarked'
                : '☆ Bookmark'}
            </button>
          </div>
        </div>

        {/* Booking Form */}
        <div className="border-t border-gray-200 bg-gray-50/50 p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Book Now</h2>
          
          {bookingSuccess && (
            <div className="mb-4 p-3 sm:p-4 bg-turno-success-light border border-turno-success rounded-md">
              <p className="text-sm sm:text-base text-turno-primary-dark font-medium">
                Booking submitted successfully! Redirecting to My Bookings...
              </p>
            </div>
          )}

          {bookingError && (
            <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm sm:text-base text-red-800">{bookingError}</p>
            </div>
          )}

          <Formik
            initialValues={{
              customer_name: '',
              customer_email: '',
            }}
            validationSchema={bookingSchema}
            onSubmit={handleBooking}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="customer_name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name *
                    </label>
                    <Field
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turno-primary focus:border-turno-primary bg-white transition-all hover:border-gray-300"
                      placeholder="Your name"
                    />
                    <FormikErrorMessage
                      name="customer_name"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer_email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <Field
                      type="email"
                      id="customer_email"
                      name="customer_email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turno-primary focus:border-turno-primary bg-white transition-all hover:border-gray-300"
                      placeholder="your.email@example.com"
                    />
                    <FormikErrorMessage
                      name="customer_email"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-turno-primary to-turno-primary-dark text-white rounded-xl text-base font-semibold hover:shadow-lg hover:shadow-turno-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default VehicleDetail;

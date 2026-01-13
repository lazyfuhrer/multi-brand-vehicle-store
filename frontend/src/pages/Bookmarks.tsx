import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookmarks, deleteBookmark } from '../services/api';
import { getBookmarkToken } from '../utils/bookmarkToken';
import Container from '../components/Container';
import ResponsiveGrid from '../components/ResponsiveGrid';
import VehicleCard from '../components/VehicleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessageComponent from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Bookmark, Vehicle } from '../types';

interface BookmarkItem {
  vehicle: Vehicle;
  bookmarkId: number;
}

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchBookmarks = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getBookmarkToken();
      
      if (!token) {
        // No token means no bookmarks
        setBookmarks([]);
        setLoading(false);
        return;
      }
      
      const response = await getBookmarks(token);
      
      // Extract vehicles from bookmarks and remove duplicates
      const vehiclesMap = new Map<number, BookmarkItem>();
      
      if (response.results && Array.isArray(response.results)) {
        response.results.forEach((bookmark: Bookmark) => {
          // Handle both cases: vehicle as object or as ID
          let vehicle: Vehicle | null = null;
          
          if (typeof bookmark.vehicle === 'object' && bookmark.vehicle !== null) {
            // Vehicle is already an object
            vehicle = bookmark.vehicle as Vehicle;
          } else if (typeof bookmark.vehicle === 'number') {
            // Vehicle is just an ID - this shouldn't happen with the updated serializer
            // but we'll handle it gracefully
            console.warn('Bookmark vehicle is an ID, not an object. Backend serializer may need updating.');
            return; // Skip this bookmark
          }
          
          if (vehicle && vehicle.id && !vehiclesMap.has(vehicle.id)) {
            vehiclesMap.set(vehicle.id, {
              vehicle: vehicle,
              bookmarkId: bookmark.id,
            });
          }
        });
      }
      
      setBookmarks(Array.from(vehiclesMap.values()));
      
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError(err instanceof Error ? err.message : 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (bookmarkId: number): Promise<void> => {
    try {
      setDeletingId(bookmarkId);
      await deleteBookmark(bookmarkId);
      // Remove from local state
      setBookmarks(prev => prev.filter(b => b.bookmarkId !== bookmarkId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
      setError('Failed to remove bookmark');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner message="Loading bookmarks..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessageComponent message={error} onRetry={fetchBookmarks} />
      </Container>
    );
  }

  return (
    <Container className="py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Bookmarks</h1>
            <p className="text-sm sm:text-base text-gray-600">
              {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
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

      {!getBookmarkToken() ? (
        <EmptyState
          message="No bookmark token found"
          description="Bookmark a vehicle to get started. Your bookmarks will be saved and accessible here."
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          }
        />
      ) : bookmarks.length === 0 ? (
        <EmptyState
          message="No bookmarks yet"
          description="Start bookmarking vehicles you're interested in to see them here."
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          }
        />
      ) : (
        <ResponsiveGrid>
          {bookmarks.map(({ vehicle, bookmarkId }) => (
            <div key={bookmarkId} className="relative">
              <VehicleCard vehicle={vehicle} />
              <button
                onClick={() => handleRemoveBookmark(bookmarkId)}
                disabled={deletingId === bookmarkId}
                className="absolute top-2 right-2 bg-red-500 text-white p-2.5 sm:p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                title="Remove bookmark"
              >
                {deletingId === bookmarkId ? (
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </ResponsiveGrid>
      )}
    </Container>
  );
};

export default Bookmarks;

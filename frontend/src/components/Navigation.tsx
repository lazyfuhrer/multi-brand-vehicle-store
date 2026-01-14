import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string): boolean => location.pathname === path;

  const navLinks = [
    { path: '/vehicles', label: 'Vehicles' },
    { path: '/bookmarks', label: 'Bookmarks' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/my-bookings', label: 'My Bookings' },
    { path: '/admin/add-vehicle', label: 'Add Vehicle' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg mb-8 border-b border-gray-100 sticky top-0 z-50 w-full left-0 right-0">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center h-16 md:h-20 w-full">
          <Link to="/vehicles" className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-turno-primary to-turno-primary-dark bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            🚗 Vehicle Store
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2 lg:gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 lg:px-5 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-turno-primary to-turno-primary-dark text-white shadow-md shadow-turno-primary/30'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-turno-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-turno-primary-light transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-turno-primary-light mt-2">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-turno-primary text-white'
                      : 'text-gray-700 hover:bg-turno-primary-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

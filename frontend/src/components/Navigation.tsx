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
    <nav className="bg-turno-card-bg shadow-md mb-8 border-b border-turno-primary-light">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/vehicles" className="text-xl sm:text-2xl font-bold text-turno-primary">
            Vehicle Store
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 lg:px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-turno-primary text-white'
                    : 'text-gray-700 hover:bg-turno-primary-light'
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

import { useState, useEffect, ChangeEvent } from 'react';
import { getVehicles } from '../services/api';
import { VehicleFilters as VehicleFiltersType, Vehicle } from '../types';
import PriceRangeSlider from './PriceRangeSlider';

interface VehicleFiltersProps {
  onFilterChange: (filters: VehicleFiltersType) => void;
  initialFilters?: VehicleFiltersType;
}

const VehicleFilters = ({ onFilterChange, initialFilters = {} }: VehicleFiltersProps) => {
  const [filters, setFilters] = useState<VehicleFiltersType>({
    brand: initialFilters.brand || '',
    fuel_type: initialFilters.fuel_type || '',
    min_price: initialFilters.min_price || '',
    max_price: initialFilters.max_price || '',
  });

  const [brands, setBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 1660000, // Default min (₹16,60,000)
    max: 6225000, // Default max (₹62,25,000)
  });
  const fuelTypes = ['Petrol', 'Diesel', 'Electric'];

  // Fetch brands and price range
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVehicles({ page_size: 1000 });
        const uniqueBrands = [...new Set(response.results.map((v: Vehicle) => v.brand))].sort();
        setBrands(uniqueBrands);

        // Calculate price range from turnos
        if (response.results && response.results.length > 0) {
          const prices = response.results.map((v: Vehicle) => v.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange({ min: minPrice, max: maxPrice });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field: keyof VehicleFiltersType, value: string): void => {
    const newFilters = {
      ...filters,
      [field]: value,
    };
    setFilters(newFilters);
  };

  const handleApply = (): void => {
    const cleanFilters: VehicleFiltersType = {};
    if (filters.brand) cleanFilters.brand = filters.brand;
    if (filters.fuel_type) cleanFilters.fuel_type = filters.fuel_type as 'Petrol' | 'Diesel' | 'Electric';
    if (filters.min_price) cleanFilters.min_price = filters.min_price;
    if (filters.max_price) cleanFilters.max_price = filters.max_price;
    onFilterChange(cleanFilters);
  };

  const handleReset = (): void => {
    setFilters({
      brand: '',
      fuel_type: '',
      min_price: '',
      max_price: '',
    });
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 mb-6 sm:mb-8 border border-gray-100 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">
        <svg className="w-5 h-5 text-turno-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            value={filters.brand || ''}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange('brand', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turno-primary focus:border-turno-primary bg-white transition-all hover:border-gray-300"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Type
          </label>
          <select
            value={filters.fuel_type || ''}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange('fuel_type', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turno-primary focus:border-turno-primary bg-white transition-all hover:border-gray-300"
          >
            <option value="">All Types</option>
            {fuelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mb-6">
        <PriceRangeSlider
          minPrice={priceRange.min}
          maxPrice={priceRange.max}
          currentMin={filters.min_price}
          currentMax={filters.max_price}
          onMinChange={(value) => handleChange('min_price', value)}
          onMaxChange={(value) => handleChange('max_price', value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={handleApply}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-turno-primary to-turno-primary-dark text-white rounded-xl hover:shadow-lg hover:shadow-turno-primary/30 transition-all font-semibold text-sm sm:text-base transform hover:-translate-y-0.5"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium text-sm sm:text-base"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default VehicleFilters;

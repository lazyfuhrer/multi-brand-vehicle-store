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
    <div className="bg-turno-card-bg rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-turno-primary-light">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            value={filters.brand || ''}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange('brand', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turno-primary focus:border-turno-primary"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turno-primary focus:border-turno-primary"
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

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
        <button
          onClick={handleApply}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 bg-turno-primary text-white rounded-md hover:bg-turno-primary-dark transition-colors font-medium text-sm sm:text-base"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default VehicleFilters;

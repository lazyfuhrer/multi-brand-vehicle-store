import { useState, useEffect, ChangeEvent } from 'react';

interface PriceRangeSliderProps {
  minPrice: number;
  maxPrice: number;
  currentMin?: string;
  currentMax?: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

const PriceRangeSlider = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onMinChange,
  onMaxChange,
}: PriceRangeSliderProps) => {
  const [minValue, setMinValue] = useState<number>(
    currentMin ? parseInt(currentMin, 10) : minPrice
  );
  const [maxValue, setMaxValue] = useState<number>(
    currentMax ? parseInt(currentMax, 10) : maxPrice
  );

  // Update local state when props change
  useEffect(() => {
    if (currentMin) {
      const parsed = parseInt(currentMin, 10);
      if (!isNaN(parsed) && parsed >= minPrice && parsed <= maxPrice) {
        setMinValue(parsed);
      }
    } else {
      setMinValue(minPrice);
    }
  }, [currentMin, minPrice, maxPrice]);

  useEffect(() => {
    if (currentMax) {
      const parsed = parseInt(currentMax, 10);
      if (!isNaN(parsed) && parsed >= minPrice && parsed <= maxPrice) {
        setMaxValue(parsed);
      }
    } else {
      setMaxValue(maxPrice);
    }
  }, [currentMax, minPrice, maxPrice]);

  // Format number in Indian format (e.g., 20,75,000)
  const formatIndianCurrency = (num: number): string => {
    return num.toLocaleString('en-IN');
  };

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;
    
    // Ensure min doesn't exceed max
    const newMin = Math.min(value, maxValue);
    setMinValue(newMin);
    onMinChange(newMin.toString());
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;
    
    // Ensure max doesn't go below min
    const newMax = Math.max(value, minValue);
    setMaxValue(newMax);
    onMaxChange(newMax.toString());
  };

  // Calculate percentage for positioning
  const range = maxPrice - minPrice;
  const minPercent = range > 0 ? ((minValue - minPrice) / range) * 100 : 0;
  const maxPercent = range > 0 ? ((maxValue - minPrice) / range) * 100 : 100;
  
  // Calculate which slider should be on top based on their positions
  // Min slider should be on top when it's to the left of max slider
  // When they're close, prioritize based on which one is being interacted with
  const sliderDistance = maxPercent - minPercent;
  const minSliderZIndex = sliderDistance < 10 ? 3 : 1; // When close, min is on top

  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-2">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <div className="text-base sm:text-lg font-semibold text-turno-primary">
              ₹{formatIndianCurrency(minValue)}
            </div>
          </div>
          <div className="sm:text-right">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <div className="text-base sm:text-lg font-semibold text-turno-price">
              ₹{formatIndianCurrency(maxValue)}
            </div>
          </div>
        </div>
      </div>

      {/* Dual Range Slider Container */}
      <div className="relative" style={{ padding: '20px 0' }}>
        {/* Track Background */}
        <div 
          className="absolute left-0 right-0 h-2 bg-gray-200 rounded-lg"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
        
        {/* Active Range Indicator */}
        <div
          className="absolute h-2 bg-turno-primary rounded-lg"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            left: `${Math.max(0, minPercent)}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`,
          }}
        />

        {/* Min Range Input */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minValue}
          onChange={handleMinChange}
          onMouseDown={(e) => {
            // Bring min slider to front when clicked
            e.currentTarget.style.zIndex = '5';
            const maxInput = e.currentTarget.parentElement?.querySelector('.range-input-max') as HTMLElement;
            if (maxInput) maxInput.style.zIndex = '2';
          }}
          onMouseUp={(e) => {
            // Reset z-index after drag
            const sliderDistance = maxPercent - minPercent;
            e.currentTarget.style.zIndex = sliderDistance < 10 ? '3' : '1';
          }}
          onTouchStart={(e) => {
            // Handle touch events for mobile
            e.currentTarget.style.zIndex = '5';
            const maxInput = e.currentTarget.parentElement?.querySelector('.range-input-max') as HTMLElement;
            if (maxInput) maxInput.style.zIndex = '2';
          }}
          className="range-input range-input-min"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '2px',
            transform: 'translateY(-50%)',
            zIndex: minSliderZIndex,
            pointerEvents: 'auto',
          }}
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxValue}
          onChange={handleMaxChange}
          onMouseDown={(e) => {
            // Bring max slider to front when clicked
            e.currentTarget.style.zIndex = '5';
            const minInput = e.currentTarget.parentElement?.querySelector('.range-input-min') as HTMLElement;
            if (minInput) minInput.style.zIndex = '1';
          }}
          onMouseUp={(e) => {
            // Reset z-index after drag
            e.currentTarget.style.zIndex = '2';
          }}
          onTouchStart={(e) => {
            // Handle touch events for mobile
            e.currentTarget.style.zIndex = '5';
            const minInput = e.currentTarget.parentElement?.querySelector('.range-input-min') as HTMLElement;
            if (minInput) minInput.style.zIndex = '1';
          }}
          className="range-input range-input-max"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '2px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            pointerEvents: 'auto',
          }}
        />
      </div>

      {/* Custom slider styles */}
      <style>{`
        .range-input {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
          margin: 0;
          padding: 0;
        }

        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: grab;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s;
          margin-top: -10px;
        }
        
        .range-input::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
        }

        .range-input::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
        }

        .range-input::-webkit-slider-track {
          background: transparent;
          height: 2px;
        }

        .range-input::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: grab;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s;
        }
        
        .range-input::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(1.15);
        }

        .range-input::-moz-range-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
        }

        .range-input::-moz-range-track {
          background: transparent;
          height: 2px;
        }
      `}</style>
    </div>
  );
};

export default PriceRangeSlider;

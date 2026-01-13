// API Response Types
export interface Vehicle {
  id: number;
  brand: string;
  name: string;
  price: number;
  fuel_type: 'Petrol' | 'Diesel' | 'Electric';
  image_url: string;
  description: string;
  created_at: string;
}

export interface Bookmark {
  id: number;
  vehicle: Vehicle | number;
  bookmark_token: string;
  created_at: string;
}

export interface Booking {
  id: number;
  vehicle: Vehicle | number;
  customer_name: string;
  customer_email: string;
  booking_token: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface VehicleSummary {
  brand: string;
  total: number;
}

// Form Types
export interface VehicleFormValues {
  brand: string;
  name: string;
  price: string;
  fuel_type: string;
  image_url: string;
  description: string;
  admin_token: string;
}

export interface BookingFormValues {
  customer_name: string;
  customer_email: string;
}

// Filter Types
export interface VehicleFilters {
  brand?: string;
  fuel_type?: string;
  min_price?: string;
  max_price?: string;
}

// Pagination Types
export interface PaginationInfo {
  count: number;
  next: string | null;
  previous: string | null;
}

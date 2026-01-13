import axios, { AxiosInstance } from 'axios';
import { Vehicle, Bookmark, Booking, PaginatedResponse, VehicleSummary, VehicleFormValues } from '../types';

// Get API base URL from environment variable, fallback to default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vehicle APIs
export const getVehicles = async (params: Record<string, string | number> = {}): Promise<PaginatedResponse<Vehicle>> => {
  const response = await api.get<PaginatedResponse<Vehicle>>('/vehicles', { params });
  return response.data;
};

export const getVehicle = async (id: number): Promise<Vehicle> => {
  const response = await api.get<Vehicle>(`/vehicles/${id}`);
  return response.data;
};

export const createVehicle = async (data: Omit<VehicleFormValues, 'price'> & { price: number }, adminToken: string): Promise<Vehicle> => {
  const response = await api.post<Vehicle>('/vehicles', data, {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
    },
  });
  return response.data;
};

// Bookmark APIs
export const getBookmarks = async (token: string): Promise<PaginatedResponse<Bookmark>> => {
  const response = await api.get<PaginatedResponse<Bookmark>>('/bookmarks', {
    params: { token },
  });
  return response.data;
};

export const createBookmark = async (data: { vehicle: number; bookmark_token?: string }): Promise<Bookmark> => {
  const response = await api.post<Bookmark>('/bookmarks', data);
  return response.data;
};

export const deleteBookmark = async (id: number): Promise<void> => {
  await api.delete(`/bookmarks/${id}`);
};

// Booking APIs
export const createBooking = async (data: { vehicle: number; customer_name: string; customer_email: string; booking_token?: string }): Promise<Booking> => {
  const response = await api.post<Booking>('/bookings', data);
  return response.data;
};

export const getMyBookings = async (token: string): Promise<Booking[]> => {
  const response = await api.get<Booking[]>('/bookings/my', {
    params: { token },
  });
  // Handle both array response and paginated response
  if (Array.isArray(response.data)) {
    return response.data;
  }
  // If backend returns paginated response, extract results
  return response.data.results || [];
};

// Dashboard APIs
export const getVehicleSummary = async (): Promise<VehicleSummary[]> => {
  const response = await api.get<VehicleSummary[]>('/vehicles/summary');
  return response.data;
};

export default api;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VehicleList from './pages/VehicleList';
import VehicleDetail from './pages/VehicleDetail';
import Bookmarks from './pages/Bookmarks';
import Dashboard from './pages/Dashboard';
import AdminAddVehicle from './pages/AdminAddVehicle';
import MyBookings from './pages/MyBookings';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/vehicles" replace />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-vehicle" element={<AdminAddVehicle />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

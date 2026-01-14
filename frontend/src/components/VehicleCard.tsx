import { Link } from 'react-router-dom';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Link to={`/vehicles/${vehicle.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-full flex flex-col border border-gray-100 animate-fade-in">
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={vehicle.image_url}
            alt={`${vehicle.brand} ${vehicle.name}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          <div className="absolute top-3 right-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-turno-primary shadow-sm">
              {vehicle.fuel_type}
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-turno-primary transition-colors">
              {vehicle.brand} {vehicle.name}
            </h3>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
            {vehicle.description}
          </p>
          <div className="mt-auto pt-3 border-t border-gray-100">
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-turno-price to-turno-price-dark bg-clip-text text-transparent">
              ₹{vehicle.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

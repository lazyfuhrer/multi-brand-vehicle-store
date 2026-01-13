import { Link } from 'react-router-dom';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Link to={`/vehicles/${vehicle.id}`}>
      <div className="bg-turno-card-bg rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer h-full flex flex-col border border-turno-primary-light">
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img
            src={vehicle.image_url}
            alt={`${vehicle.brand} ${vehicle.name}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              {vehicle.brand} {vehicle.name}
            </h3>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-turno-primary-light text-turno-primary-dark">
              {vehicle.fuel_type}
            </span>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 flex-grow">
            {vehicle.description}
          </p>
          <div className="mt-auto">
            <p className="text-xl sm:text-2xl font-bold text-turno-price">
              ₹{vehicle.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

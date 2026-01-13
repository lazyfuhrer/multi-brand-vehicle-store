# 🚗 Multi-Brand Vehicle Store

A full-stack web application for browsing, booking, and managing vehicles from multiple brands. Built with Django REST Framework (backend) and React + TypeScript (frontend).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![Django](https://img.shields.io/badge/django-5.2.10-green.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Frontend Features](#-frontend-features)
- [Database Management](#-database-management)
- [Testing](#-testing)
- [Postman Collection](#-postman-collection)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Backend Features
- ✅ RESTful API with Django REST Framework
- ✅ PostgreSQL database with optimized indexes
- ✅ Pagination on all listing endpoints
- ✅ Advanced filtering (brand, fuel type, price range)
- ✅ Guest booking system with token-based authentication
- ✅ Bookmark functionality
- ✅ Admin-protected vehicle creation
- ✅ Vehicle statistics and summary endpoints
- ✅ Optimized database queries (no N+1 problems)
- ✅ CORS enabled for frontend integration

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with Turno-inspired color palette
- ✅ Vehicle browsing with filters
- ✅ Price range slider for filtering
- ✅ Vehicle detail pages
- ✅ Guest booking system
- ✅ Bookmark management
- ✅ "My Bookings" page
- ✅ Admin vehicle creation form
- ✅ Dashboard with vehicle statistics
- ✅ TypeScript for type safety
- ✅ Form validation with Formik + Yup

## 🛠 Tech Stack

### Backend
- **Framework**: Django 5.2.10
- **API**: Django REST Framework 3.16.1
- **Database**: PostgreSQL
- **Language**: Python 3.10+
- **Other**: python-dotenv, django-cors-headers

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.19
- **Routing**: React Router DOM 7.12.0
- **HTTP Client**: Axios 1.13.2
- **Forms**: Formik 2.4.9 + Yup 1.7.1

## 📁 Project Structure

```
multi-brand-vehicle-store/
├── backend/                    # Django backend
│   ├── backend/               # Django project settings
│   │   ├── settings.py        # Project configuration
│   │   ├── urls.py            # URL routing
│   │   └── ...
│   ├── vehicles/              # Vehicles app
│   │   ├── models.py          # Vehicle model
│   │   ├── views.py           # API views
│   │   ├── serializers.py    # DRF serializers
│   │   └── management/        # Custom commands
│   │       └── commands/
│   │           ├── seed_vehicles.py
│   │           └── clear_vehicles.py
│   ├── bookings/              # Bookings app
│   │   ├── models.py          # Booking model
│   │   ├── views.py           # Booking API views
│   │   └── serializers.py
│   ├── bookmarks/             # Bookmarks app
│   │   ├── models.py          # Bookmark model
│   │   ├── views.py           # Bookmark API views
│   │   └── serializers.py
│   ├── venv/                  # Python virtual environment
│   ├── manage.py              # Django management script
│   ├── requirements.txt       # Python dependencies
│   ├── manage                 # Helper script
│   ├── run.sh                 # Run script
│   └── reseed_data.sh         # Reseed data script
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── VehicleCard.tsx
│   │   │   ├── VehicleFilters.tsx
│   │   │   ├── PriceRangeSlider.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── ...
│   │   ├── pages/            # Page components
│   │   │   ├── VehicleList.tsx
│   │   │   ├── VehicleDetail.tsx
│   │   │   ├── MyBookings.tsx
│   │   │   ├── Bookmarks.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── AdminAddVehicle.tsx
│   │   ├── services/         # API services
│   │   │   └── api.ts
│   │   ├── hooks/            # Custom hooks
│   │   │   └── usePaginatedData.ts
│   │   ├── utils/            # Utilities
│   │   │   ├── bookingToken.ts
│   │   │   └── bookmarkToken.ts
│   │   ├── types/            # TypeScript types
│   │   │   └── index.ts
│   │   └── App.tsx           # Main app component
│   ├── package.json
│   ├── tailwind.config.js    # Tailwind configuration
│   └── vite.config.ts        # Vite configuration
│
├── Vehicle_Store_API.postman_collection.json  # Postman collection
├── Vehicle_Store_API.postman_environment.json # Postman environment
├── POSTMAN_COLLECTION_README.md               # Postman docs
└── README.md                                  # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.10 or higher
- **Node.js** 18.x or higher
- **npm** or **yarn**
- **PostgreSQL** 12 or higher
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd multi-brand-vehicle-store
```

### 2. Backend Setup

#### Step 1: Create Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

#### Step 3: Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database Configuration
DB_NAME=vehicle_store
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

# Admin Token (for protecting vehicle creation endpoint)
ADMIN_TOKEN=your-admin-token-here
```

#### Step 4: Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE vehicle_store;

# Exit PostgreSQL
\q
```

#### Step 5: Run Migrations

```bash
python manage.py migrate
```

#### Step 6: Data Seeding ✅ **AUTOMATIC**

**Data is automatically seeded after migrations!** When you run `python manage.py migrate`, the database will be automatically populated with 20 sample vehicles from various brands (Toyota, Honda, Ford, Tesla, BMW, Mercedes-Benz, Audi, Nissan, Chevrolet, Hyundai, Volkswagen) with prices in INR.

> **Note**: Seeding only happens if the database is empty. If you want to manually reseed data, you can still use `python manage.py seed_vehicles` or `./reseed_data.sh`.

### 3. Frontend Setup

#### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

#### Step 2: Configure Environment Variables (Optional)

Create a `.env` file in the `frontend/` directory:

```bash
cp .env.example .env
```

Edit `.env` if your backend runs on a different URL:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:8000/api
```

> **Note**: The frontend defaults to `http://localhost:8000/api` if no environment variable is set. Only create `.env` if you need to change this.

## 🏃 Running the Application

> ✅ **Data is automatically seeded after migrations!** After running `python manage.py migrate`, your database will be populated with sample vehicles. No manual seeding required.

### Option 1: Run Both Servers Manually

#### Backend Server

```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

The backend will run on `http://localhost:8000`

#### Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Option 2: Use Helper Scripts

#### Backend Helper Scripts

```bash
# Using manage script
cd backend
./manage runserver

# Using run.sh
cd backend
./run.sh python manage.py runserver
```

#### Reseed Data

```bash
cd backend
./reseed_data.sh
```

## 📚 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Endpoints

#### Vehicles

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/vehicles` | List all vehicles (with filters) | No |
| GET | `/vehicles/{id}` | Get vehicle details | No |
| POST | `/vehicles` | Create new vehicle | Admin Token |
| GET | `/vehicles/summary` | Get vehicle statistics by brand | No |

**Query Parameters for GET /vehicles:**
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 10)
- `brand`: Filter by brand name
- `fuel_type`: Filter by fuel type (Petrol, Diesel, Electric)
- `min_price`: Minimum price in INR
- `max_price`: Maximum price in INR

**Example:**
```
GET /api/vehicles?brand=Toyota&fuel_type=Petrol&min_price=1000000&max_price=5000000
```

#### Bookings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/bookings` | Create a booking | No |
| GET | `/bookings/my?token={token}` | Get bookings by token | No |

**Create Booking Request Body:**
```json
{
    "vehicle": 1,
    "customer_name": "John Doe",
    "customer_email": "john.doe@example.com",
    "booking_token": "optional-existing-token"
}
```

#### Bookmarks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/bookmarks?token={token}` | List bookmarks by token | No |
| POST | `/bookmarks` | Create a bookmark | No |
| DELETE | `/bookmarks/{id}` | Delete a bookmark | No |
| GET | `/bookmarks/my?token={token}` | Get bookmarks by token | No |

**Create Bookmark Request Body:**
```json
{
    "vehicle": 1,
    "bookmark_token": "optional-existing-token"
}
```

### Authentication

#### Admin Token

For creating vehicles, include the admin token in the Authorization header:

```
Authorization: Bearer {ADMIN_TOKEN}
```

Get the admin token from your `backend/.env` file.

### Response Format

All API responses follow RESTful conventions:

**Success Response:**
```json
{
    "id": 1,
    "brand": "Toyota",
    "name": "Camry",
    "price": 2075000,
    "fuel_type": "Petrol",
    "image_url": "https://...",
    "description": "...",
    "created_at": "2026-01-13T21:14:46.871438Z"
}
```

**Error Response:**
```json
{
    "detail": "Error message here"
}
```

**Paginated Response:**
```json
{
    "count": 100,
    "next": "http://localhost:8000/api/vehicles?page=2",
    "previous": null,
    "results": [...]
}
```

## 🎨 Frontend Features

### Pages

1. **Vehicle List** (`/vehicles`)
   - Browse all vehicles with pagination
   - Filter by brand, fuel type, and price range
   - Responsive grid layout

2. **Vehicle Detail** (`/vehicles/:id`)
   - View detailed vehicle information
   - Book vehicle
   - Bookmark vehicle

3. **My Bookings** (`/my-bookings`)
   - View all bookings for current guest token
   - Automatically tracks bookings via localStorage

4. **Bookmarks** (`/bookmarks`)
   - View all bookmarked vehicles
   - Remove bookmarks

5. **Dashboard** (`/dashboard`)
   - Vehicle statistics by brand
   - Total vehicle count
   - Visual charts and tables

6. **Add Vehicle** (`/admin/add-vehicle`)
   - Admin-only form to add new vehicles
   - Requires admin token

### Key Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Price Filtering**: Interactive dual-handle price range slider
- **Guest System**: No login required - uses browser-based tokens
- **Real-time Updates**: Instant feedback on all actions
- **Error Handling**: User-friendly error messages
- **Loading States**: Loading indicators for better UX

## 🗄 Database Management

### Automatic Seeding ✅

**Data is automatically seeded after migrations!** When you run `python manage.py migrate`, the database will be automatically populated with 20 sample vehicles if the database is empty.

**How it works:**
- Seeding happens automatically via Django's `post_migrate` signal
- Only seeds if the database is empty (no vehicles exist)
- Safe to run migrations multiple times - won't create duplicates
- Uses `get_or_create()` to prevent duplicate entries

### Manual Seeding (Optional)

If you want to manually seed or reseed data:

```bash
cd backend
source venv/bin/activate
python manage.py seed_vehicles
```

This command will:
- Create 20 sample vehicles from various brands
- Use `get_or_create()` to avoid duplicates (safe to run multiple times)
- Display which vehicles were created vs. which already existed

### Clearing Data

```bash
cd backend
source venv/bin/activate
python manage.py clear_vehicles
```

### Reseeding Data

```bash
cd backend
./reseed_data.sh
```

This script clears existing data and reseeds fresh vehicle data.

### Database Migrations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
source venv/bin/activate
python manage.py test
```

### Frontend Testing

```bash
cd frontend
npm run test  # If test setup exists
```

### Manual Testing

1. Start both servers (backend and frontend)
2. Navigate to `http://localhost:5173`
3. Test all features:
   - Browse vehicles
   - Filter vehicles
   - View vehicle details
   - Create bookings
   - Manage bookmarks
   - View dashboard
   - Add vehicles (admin)

## 📮 Postman Collection

A complete Postman collection is included for API testing:

- **Collection File**: `Vehicle_Store_API.postman_collection.json`
- **Environment File**: `Vehicle_Store_API.postman_environment.json`
- **Documentation**: `POSTMAN_COLLECTION_README.md`

### Importing to Postman

1. Open Postman
2. Click **Import**
3. Select `Vehicle_Store_API.postman_collection.json`
4. (Optional) Import `Vehicle_Store_API.postman_environment.json`
5. Update collection variables:
   - `base_url`: `http://localhost:8000`
   - `admin_token`: Your admin token from `.env`

See `POSTMAN_COLLECTION_README.md` for detailed usage instructions.

## ⚙️ Configuration

### Backend Configuration

Key settings in `backend/backend/settings.py`:

- **Database**: PostgreSQL configuration
- **CORS**: Enabled for frontend integration
- **Admin Token**: Configurable via environment variable
- **Pagination**: Default page size: 10

### Frontend Configuration

Key files:

- **API Base URL**: `frontend/src/services/api.ts`
- **Tailwind Config**: `frontend/tailwind.config.js`
- **Vite Config**: `frontend/vite.config.ts`

### Environment Variables

**Backend (.env):**
```env
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=vehicle_store
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
ADMIN_TOKEN=your-admin-token
```

## 🏗 Database Schema

### Vehicle Model
- `id`: Primary key
- `brand`: CharField (indexed)
- `name`: CharField
- `price`: IntegerField (indexed, in INR)
- `fuel_type`: CharField (indexed)
- `image_url`: URLField
- `description`: TextField
- `created_at`: DateTimeField (indexed)

**Indexes:**
- Composite index on `(brand, fuel_type)`
- Composite index on `(price, -created_at)`

### Booking Model
- `id`: Primary key
- `vehicle`: ForeignKey to Vehicle
- `customer_name`: CharField
- `customer_email`: EmailField
- `booking_token`: CharField (indexed)
- `created_at`: DateTimeField

**Indexes:**
- Composite index on `(booking_token, -created_at)`

### Bookmark Model
- `id`: Primary key
- `vehicle`: ForeignKey to Vehicle
- `bookmark_token`: CharField (indexed)
- `created_at`: DateTimeField

**Indexes:**
- Composite index on `(bookmark_token, -created_at)`

## 🎯 Key Design Decisions

1. **Guest Booking System**: No user authentication - uses browser-based tokens stored in localStorage
2. **Token-based Grouping**: Multiple bookings/bookmarks can share the same token
3. **Admin Protection**: Simple token-based authentication for vehicle creation
4. **Currency**: All prices in INR (Indian Rupees)
5. **Responsive Design**: Mobile-first approach with Tailwind CSS
6. **Type Safety**: Full TypeScript implementation for frontend
7. **Database Optimization**: Strategic indexes for common query patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

**Migration Errors:**
- Run `python manage.py migrate --run-syncdb`
- Check for conflicting migrations

**Module Not Found:**
- Activate virtual environment
- Install requirements: `pip install -r requirements.txt`

### Frontend Issues

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version (18+)

**API Connection Errors:**
- Verify backend is running on `http://localhost:8000`
- Check CORS settings in backend
- Verify API base URL in `api.ts`

**TypeScript Errors:**
- Run `npm run build` to see detailed errors
- Check type definitions in `types/index.ts`

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

## 🙏 Acknowledgments

- Django REST Framework for the excellent API framework
- React team for the amazing frontend library
- Tailwind CSS for the utility-first CSS framework
- All contributors and testers

---

**Built with ❤️ using Django, React, and TypeScript**

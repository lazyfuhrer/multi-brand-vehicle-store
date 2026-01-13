from django.apps import AppConfig
from django.db.models.signals import post_migrate
import sys


def seed_vehicles_on_migrate(sender, **kwargs):
    """Automatically seed vehicles after migrations if database is empty"""
    # Skip if running tests
    if 'test' in sys.argv:
        return
    
    from vehicles.models import Vehicle
    
    # Only seed if database is empty (no vehicles exist)
    # This prevents re-seeding on every migration
    if Vehicle.objects.count() == 0:
        vehicles_data = [
            {
                'brand': 'Toyota',
                'name': 'Camry',
                'price': 2075000,  # 25000 USD * 83 = 2,075,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
                'description': 'Reliable and fuel-efficient sedan with advanced safety features and comfortable interior.'
            },
            {
                'brand': 'Toyota',
                'name': 'Prius',
                'price': 2324000,  # 28000 USD * 83 = 2,324,000 INR
                'fuel_type': 'Electric',
                'image_url': 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnxlbnwwfHwwfHx8MA%3D%3D?w=800',
                'description': 'Eco-friendly hybrid vehicle with excellent fuel economy and modern technology features.'
            },
            {
                'brand': 'Honda',
                'name': 'Civic',
                'price': 1826000,  # 22000 USD * 83 = 1,826,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
                'description': 'Sporty compact car with responsive handling and a well-designed interior.'
            },
            {
                'brand': 'Honda',
                'name': 'Accord',
                'price': 2241000,  # 27000 USD * 83 = 2,241,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
                'description': 'Spacious midsize sedan with powerful engine and premium features.'
            },
            {
                'brand': 'Ford',
                'name': 'F-150',
                'price': 2905000,  # 35000 USD * 83 = 2,905,000 INR
                'fuel_type': 'Diesel',
                'image_url': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
                'description': 'Robust pickup truck with impressive towing capacity and durable build quality.'
            },
            {
                'brand': 'Ford',
                'name': 'Mustang',
                'price': 2656000,  # 32000 USD * 83 = 2,656,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
                'description': 'Iconic sports car with powerful V8 engine and aggressive styling.'
            },
            {
                'brand': 'Tesla',
                'name': 'Model 3',
                'price': 3320000,  # 40000 USD * 83 = 3,320,000 INR
                'fuel_type': 'Electric',
                'image_url': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
                'description': 'Premium electric sedan with autopilot features and impressive range.'
            },
            {
                'brand': 'Tesla',
                'name': 'Model S',
                'price': 6225000,  # 75000 USD * 83 = 6,225,000 INR
                'fuel_type': 'Electric',
                'image_url': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
                'description': 'Luxury electric vehicle with cutting-edge technology and exceptional performance.'
            },
            {
                'brand': 'BMW',
                'name': '3 Series',
                'price': 3486000,  # 42000 USD * 83 = 3,486,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
                'description': 'Luxury compact sedan with sporty performance and premium interior materials.'
            },
            {
                'brand': 'BMW',
                'name': 'X5',
                'price': 4565000,  # 55000 USD * 83 = 4,565,000 INR
                'fuel_type': 'Diesel',
                'image_url': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
                'description': 'Premium SUV with spacious cabin and advanced driving assistance systems.'
            },
            {
                'brand': 'Mercedes-Benz',
                'name': 'C-Class',
                'price': 3735000,  # 45000 USD * 83 = 3,735,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
                'description': 'Elegant luxury sedan with sophisticated design and advanced technology.'
            },
            {
                'brand': 'Mercedes-Benz',
                'name': 'E-Class',
                'price': 4814000,  # 58000 USD * 83 = 4,814,000 INR
                'fuel_type': 'Diesel',
                'image_url': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
                'description': 'Executive luxury sedan with exceptional comfort and powerful engine options.'
            },
            {
                'brand': 'Audi',
                'name': 'A4',
                'price': 3320000,  # 40000 USD * 83 = 3,320,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
                'description': 'Premium compact sedan with quattro all-wheel drive and refined interior.'
            },
            {
                'brand': 'Audi',
                'name': 'Q7',
                'price': 4980000,  # 60000 USD * 83 = 4,980,000 INR
                'fuel_type': 'Diesel',
                'image_url': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
                'description': 'Luxury three-row SUV with advanced safety features and premium amenities.'
            },
            {
                'brand': 'Nissan',
                'name': 'Altima',
                'price': 1992000,  # 24000 USD * 83 = 1,992,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
                'description': 'Comfortable midsize sedan with good fuel economy and modern infotainment system.'
            },
            {
                'brand': 'Nissan',
                'name': 'Leaf',
                'price': 2656000,  # 32000 USD * 83 = 2,656,000 INR
                'fuel_type': 'Electric',
                'image_url': 'https://images.unsplash.com/photo-1459603677915-a62079ffd002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnxlbnwwfHwwfHx8MA%3D%3D?w=800',
                'description': 'Affordable electric vehicle with practical range and user-friendly features.'
            },
            {
                'brand': 'Chevrolet',
                'name': 'Silverado',
                'price': 2739000,  # 33000 USD * 83 = 2,739,000 INR
                'fuel_type': 'Diesel',
                'image_url': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
                'description': 'Full-size pickup truck with strong towing capabilities and modern technology.'
            },
            {
                'brand': 'Hyundai',
                'name': 'Elantra',
                'price': 1660000,  # 20000 USD * 83 = 1,660,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyfGVufDB8fDB8fHww?w=800',
                'description': 'Value-packed compact sedan with generous warranty and modern features.'
            },
            {
                'brand': 'Hyundai',
                'name': 'Kona Electric',
                'price': 3154000,  # 38000 USD * 83 = 3,154,000 INR
                'fuel_type': 'Electric',
                'image_url': 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcnxlbnwwfHwwfHx8MA%3D%3D?w=800',
                'description': 'Compact electric SUV with impressive range and quick charging capability.'
            },
            {
                'brand': 'Volkswagen',
                'name': 'Jetta',
                'price': 1743000,  # 21000 USD * 83 = 1,743,000 INR
                'fuel_type': 'Petrol',
                'image_url': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
                'description': 'German-engineered compact sedan with efficient engine and quality build.'
            },
        ]
        
        created_count = 0
        for vehicle_data in vehicles_data:
            vehicle, created = Vehicle.objects.get_or_create(
                brand=vehicle_data['brand'],
                name=vehicle_data['name'],
                defaults=vehicle_data
            )
            if created:
                created_count += 1
        
        if created_count > 0:
            print(f'\n✅ Auto-seeded {created_count} vehicles into the database.')


class VehiclesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'vehicles'
    
    def ready(self):
        # Connect the signal to auto-seed after migrations
        post_migrate.connect(seed_vehicles_on_migrate, sender=self)

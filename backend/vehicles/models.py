from django.db import models


class Vehicle(models.Model):
    brand = models.CharField(max_length=100, db_index=True)
    name = models.CharField(max_length=100)
    price = models.IntegerField(db_index=True)
    fuel_type = models.CharField(max_length=20, db_index=True)
    image_url = models.URLField()
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            # Composite index for common filter combinations
            models.Index(fields=['brand', 'fuel_type'], name='vehicle_brand_fuel_idx'),
            # Composite index for price filtering with ordering
            models.Index(fields=['price', '-created_at'], name='vehicle_price_created_idx'),
            # Index for ordering by created_at (already has db_index, but composite is better)
        ]

    def __str__(self):
        return f"{self.brand} {self.name}"

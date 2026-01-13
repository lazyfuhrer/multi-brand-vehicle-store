from django.db import models
from vehicles.models import Vehicle
import secrets


def generate_booking_token():
    """Generate a unique, unguessable booking token"""
    return secrets.token_urlsafe(32)


# Export for use in views
__all__ = ['generate_booking_token']


class Booking(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    booking_token = models.CharField(max_length=64, db_index=True, default=generate_booking_token)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            # Composite index for token filtering with ordering (most common query pattern)
            models.Index(fields=['booking_token', '-created_at'], name='booking_token_created_idx'),
        ]

    def __str__(self):
        return f"Booking: {self.vehicle} by {self.customer_name}"

    @staticmethod
    def generate_token():
        """Generate a unique, unguessable booking token"""
        return secrets.token_urlsafe(32)

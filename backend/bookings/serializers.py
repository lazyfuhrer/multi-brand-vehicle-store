from rest_framework import serializers
from .models import Booking
from vehicles.serializers import VehicleSerializer


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('created_at',)
        # booking_token is NOT read-only - we allow it to be set if provided
    
    def to_representation(self, instance):
        # Override to include full vehicle object in response instead of just ID
        representation = super().to_representation(instance)
        # Replace vehicle ID with full vehicle object
        if 'vehicle' in representation:
            # Use cached vehicle if available (from select_related)
            vehicle = getattr(instance, 'vehicle', None)
            if vehicle:
                representation['vehicle'] = VehicleSerializer(vehicle).data
        return representation

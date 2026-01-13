from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Booking, generate_booking_token
from .serializers import BookingSerializer


class BookingCreateView(CreateAPIView):
    serializer_class = BookingSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Create a booking and return it with the booking_token.
        If booking_token is provided in request, use it (for grouping multiple bookings).
        Otherwise, generate a new token.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # If no token provided, generate one
        booking_token = request.data.get('booking_token') or generate_booking_token()
        
        # Save with the token (either provided or generated)
        booking = serializer.save(booking_token=booking_token)
        
        # Return the booking with token
        response_serializer = BookingSerializer(booking)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class MyBookingsView(ListAPIView):
    """
    List bookings for a specific booking token.
    Token should be provided as query parameter: ?token=<booking_token>
    """
    serializer_class = BookingSerializer
    
    def get_queryset(self):
        booking_token = self.request.query_params.get('token')
        if not booking_token:
            return Booking.objects.none()
        return Booking.objects.filter(booking_token=booking_token).select_related('vehicle').order_by('-created_at')

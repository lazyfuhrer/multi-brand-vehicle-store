from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from django.conf import settings
from .models import Vehicle
from .serializers import VehicleSerializer


class VehicleListCreateView(ListCreateAPIView):
    serializer_class = VehicleSerializer

    def get_queryset(self):
        qs = Vehicle.objects.all()

        brand = self.request.query_params.get('brand')
        fuel = self.request.query_params.get('fuel_type')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if brand:
            qs = qs.filter(brand=brand)
        if fuel:
            qs = qs.filter(fuel_type=fuel)
        if min_price:
            try:
                qs = qs.filter(price__gte=int(min_price))
            except (ValueError, TypeError):
                pass  # Ignore invalid price values
        if max_price:
            try:
                qs = qs.filter(price__lte=int(max_price))
            except (ValueError, TypeError):
                pass  # Ignore invalid price values

        return qs.order_by('-created_at')

    def create(self, request):
        """
        Create a new vehicle. Requires admin token in Authorization header.
        Header format: Authorization: Bearer <ADMIN_TOKEN>
        """
        auth_header = request.headers.get('Authorization', '')
        expected_token = f'Bearer {settings.ADMIN_TOKEN}'
        
        if auth_header != expected_token:
            return Response(
                {'detail': 'You are not authorized for this action. Invalid admin token.'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().create(request)


class VehicleDetailView(RetrieveAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


@api_view(['GET'])
def vehicle_summary(request):
    summary = (
        Vehicle.objects
        .values('brand')
        .annotate(total=Count('id'))
        .order_by('brand')
    )
    return Response(summary)

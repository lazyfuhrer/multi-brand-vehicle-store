"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from vehicles.views import VehicleListCreateView, VehicleDetailView, vehicle_summary
from bookmarks.views import BookmarkListCreateView, BookmarkDeleteView, MyBookmarksView as MyBookmarksListView
from bookings.views import BookingCreateView, MyBookingsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/vehicles', VehicleListCreateView.as_view()),
    path('api/vehicles/<int:pk>', VehicleDetailView.as_view()),
    path('api/bookmarks', BookmarkListCreateView.as_view()),
    path('api/bookmarks/<int:pk>', BookmarkDeleteView.as_view()),
    path('api/bookmarks/my', MyBookmarksListView.as_view()),
    path('api/bookings', BookingCreateView.as_view()),
    path('api/bookings/my', MyBookingsView.as_view()),
    path('api/vehicles/summary', vehicle_summary),
]

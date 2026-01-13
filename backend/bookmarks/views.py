from rest_framework.generics import ListCreateAPIView, DestroyAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Bookmark, generate_bookmark_token
from .serializers import BookmarkSerializer


class BookmarkListCreateView(ListCreateAPIView):
    serializer_class = BookmarkSerializer
    
    def get_queryset(self):
        """
        Filter bookmarks by token if provided.
        If no token, return empty queryset (for security).
        """
        bookmark_token = self.request.query_params.get('token')
        if not bookmark_token:
            return Bookmark.objects.none()
        return Bookmark.objects.filter(bookmark_token=bookmark_token).select_related('vehicle').order_by('-created_at')
    
    def create(self, request, *args, **kwargs):
        """
        Create a bookmark and return it with the bookmark_token.
        If bookmark_token is provided in request, use it (for grouping multiple bookmarks).
        Otherwise, generate a new token.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # If no token provided, generate one
        bookmark_token = request.data.get('bookmark_token') or generate_bookmark_token()
        
        # Save with the token (either provided or generated)
        bookmark = serializer.save(bookmark_token=bookmark_token)
        
        # Return the bookmark with token
        response_serializer = BookmarkSerializer(bookmark)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class BookmarkDeleteView(DestroyAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer


class MyBookmarksView(ListAPIView):
    """
    List bookmarks for a specific bookmark token.
    Token should be provided as query parameter: ?token=<bookmark_token>
    """
    serializer_class = BookmarkSerializer
    
    def get_queryset(self):
        bookmark_token = self.request.query_params.get('token')
        if not bookmark_token:
            return Bookmark.objects.none()
        return Bookmark.objects.filter(bookmark_token=bookmark_token).select_related('vehicle').order_by('-created_at')

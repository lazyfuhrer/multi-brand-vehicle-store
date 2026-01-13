from django.db import models
from vehicles.models import Vehicle
import secrets


def generate_bookmark_token():
    """Generate a unique, unguessable bookmark token"""
    return secrets.token_urlsafe(32)


# Export for use in views
__all__ = ['generate_bookmark_token']


class Bookmark(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name='bookmarks'
    )
    bookmark_token = models.CharField(max_length=64, db_index=True, default=generate_bookmark_token)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            # Composite index for token filtering with ordering (most common query pattern)
            models.Index(fields=['bookmark_token', '-created_at'], name='bookmark_token_created_idx'),
        ]

    def __str__(self):
        return f"Bookmark: {self.vehicle}"

    @staticmethod
    def generate_token():
        """Generate a unique, unguessable bookmark token"""
        return secrets.token_urlsafe(32)

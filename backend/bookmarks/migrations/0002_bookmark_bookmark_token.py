# Generated manually
from django.db import migrations, models
import secrets


def generate_token():
    """Generate a unique, unguessable bookmark token"""
    return secrets.token_urlsafe(32)


def populate_tokens(apps, schema_editor):
    """Generate tokens for existing bookmarks"""
    Bookmark = apps.get_model('bookmarks', 'Bookmark')
    for bookmark in Bookmark.objects.all():
        if not bookmark.bookmark_token:
            bookmark.bookmark_token = generate_token()
            bookmark.save(update_fields=['bookmark_token'])


class Migration(migrations.Migration):

    dependencies = [
        ('bookmarks', '0001_initial'),
    ]

    operations = [
        # Step 1: Add field as nullable without unique constraint
        migrations.AddField(
            model_name='bookmark',
            name='bookmark_token',
            field=models.CharField(max_length=64, null=True, blank=True, db_index=False),
        ),
        # Step 2: Populate tokens for existing bookmarks
        migrations.RunPython(populate_tokens, migrations.RunPython.noop),
        # Step 3: Make field non-nullable
        migrations.AlterField(
            model_name='bookmark',
            name='bookmark_token',
            field=models.CharField(max_length=64, null=False, default=generate_token),
        ),
        # Step 4: Add index and unique constraint
        migrations.AlterField(
            model_name='bookmark',
            name='bookmark_token',
            field=models.CharField(max_length=64, unique=True, db_index=True, default=generate_token),
        ),
    ]

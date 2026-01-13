from django.core.management.base import BaseCommand
from vehicles.models import Vehicle


class Command(BaseCommand):
    help = 'Delete all vehicles from the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Skip confirmation prompt',
        )

    def handle(self, *args, **options):
        vehicle_count = Vehicle.objects.count()
        
        if vehicle_count == 0:
            self.stdout.write(
                self.style.WARNING('No vehicles found in the database.')
            )
            return

        if not options['confirm']:
            confirm = input(
                f'Are you sure you want to delete all {vehicle_count} vehicles? (yes/no): '
            )
            if confirm.lower() != 'yes':
                self.stdout.write(
                    self.style.WARNING('Operation cancelled.')
                )
                return

        deleted_count, _ = Vehicle.objects.all().delete()
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully deleted {deleted_count} vehicle(s) from the database.'
            )
        )

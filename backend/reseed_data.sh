#!/bin/bash
# Script to clear all seeded data and re-seed vehicles
# Usage: ./reseed_data.sh

cd "$(dirname "$0")"
source venv/bin/activate

echo "🗑️  Clearing all vehicles..."
python manage.py clear_vehicles --confirm

echo ""
echo "🌱 Re-seeding vehicles..."
python manage.py seed_vehicles

echo ""
echo "✅ Done! Data has been cleared and re-seeded."

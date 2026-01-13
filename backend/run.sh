#!/bin/bash
# Helper script to run Django commands with venv activated
# Usage: ./run.sh <command>
# Example: ./run.sh "python manage.py runserver"

cd "$(dirname "$0")"
source venv/bin/activate
exec "$@"

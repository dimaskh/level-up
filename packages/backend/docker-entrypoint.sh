#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "Database is ready!"

# Run migrations
echo "Running database migrations..."
pnpm db:migrate

# Run seeds
echo "Seeding database..."
pnpm db:seed

# Start the application
echo "Starting the application..."
exec pnpm start:dev

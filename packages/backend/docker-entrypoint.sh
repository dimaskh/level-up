#!/bin/sh

set -e

# Function to wait for postgres
wait_for_postgres() {
  echo "Waiting for database to be ready..."
  while ! nc -z postgres 5432; do
    sleep 1
  done
  # Additional wait to ensure Postgres is fully ready
  sleep 2
  echo "Database is ready!"
}

# Function to push schema
push_schema() {
  echo "Pushing database schema..."
  pnpm db:push
  if [ $? -ne 0 ]; then
    echo "Schema push failed!"
    exit 1
  fi
  echo "Schema push completed successfully!"
}

# Function to run seeds
run_seeds() {
  echo "Seeding database..."
  pnpm db:seed
  if [ $? -ne 0 ]; then
    echo "Seeding failed!"
    exit 1
  fi
  echo "Database seeded successfully!"
}

# Main execution
wait_for_postgres
push_schema
run_seeds

echo "Starting the application..."
exec pnpm start:dev

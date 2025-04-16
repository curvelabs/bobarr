#!/bin/bash
set -e

# Use absolute path for reliability with the new workspace structure
WORKSPACE_PATH="/workspaces/bobarr"
cd $WORKSPACE_PATH

echo "Setting up Bobarr development environment..."

# Create .env file if needed
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
fi

# Install project dependencies
if [ -f "package.json" ]; then
    echo "Installing project dependencies..."
    yarn install
fi

# Set up API package if exists
if [ -d "packages/api" ]; then
    echo "Setting up API package..."
    cd packages/api
    yarn install
    cd $WORKSPACE_PATH
fi

# Set up web package if exists
if [ -d "packages/web" ]; then
    echo "Setting up web package..."
    cd packages/web
    yarn install
    cd $WORKSPACE_PATH
fi

echo "Setup complete! Available services:"
echo "- Web UI: http://localhost:3000"
echo "- API: http://localhost:4000"
echo "- Transmission: http://localhost:9091"
echo "- Jackett: http://localhost:9117"
echo "- FlareSolverr: http://localhost:8191"

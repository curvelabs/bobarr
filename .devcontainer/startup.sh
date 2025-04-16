#!/bin/bash
set -e

# Use absolute path for reliability with the new workspace structure
WORKSPACE_PATH="/workspaces/bobarr"
cd $WORKSPACE_PATH

# Force VS Code to open in the correct directory if it opened at root
# This runs as a post-start command from settings.json
if [ "$PWD" != "$WORKSPACE_PATH" ]; then
  echo "Redirecting workspace to $WORKSPACE_PATH"
  cd $WORKSPACE_PATH
fi

echo "Starting Bobarr development stack..."

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp ".env.example" ".env"
        echo "Created .env from example file"
    else
        echo "WARNING: No .env or .env.example file found"
        touch ".env"
    fi
fi

# Check Docker installation
echo "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "WARNING: Docker CLI not found. Docker commands might not work."
else
    # Only attempt Docker operations if Docker CLI is available
    echo "Starting services..."
    docker compose -f docker-compose.yml -f docker-compose.dev.yml down || true
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d || true
    
    echo "Services started!"
fi

echo "Setup complete!"
echo "- Web UI: http://localhost:3000"
echo "- API: http://localhost:4000"
echo "- Transmission: http://localhost:9091"
echo "- Jackett: http://localhost:9117"
echo "- FlareSolverr: http://localhost:8191"

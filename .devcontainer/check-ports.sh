#!/bin/bash
set -e

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker CLI not found. Please rebuild the container."
    exit 1
fi

# Check service status
echo "Docker service status:"
docker compose ps

# Check if services are running and ports are accessible
echo "Checking port forwarding..."
echo "Web UI (3000): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "Not accessible")"
echo "API (4000): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000 2>/dev/null || echo "Not accessible")"
echo "Transmission (9091): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:9091 2>/dev/null || echo "Not accessible")"
echo "Jackett (9117): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:9117 2>/dev/null || echo "Not accessible")"
echo "FlareSolverr (8191): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:8191 2>/dev/null || echo "Not accessible")"

# Show host ports
echo "Forwarded ports:"
docker compose ps -a | grep -E '(0.0.0.0|:::)'

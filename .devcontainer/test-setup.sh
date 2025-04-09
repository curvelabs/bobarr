#!/bin/bash

echo "Testing Bobarr development container setup..."

# Check core tools
echo -n "Node.js: "
node --version
echo -n "npm: "
npm --version
echo -n "yarn: "
yarn --version
echo -n "pnpm: "
pnpm --version

echo -n "Python: "
python --version
echo -n "pip: "
pip --version
echo -n "uv: "
uv --version || echo "Not installed"

echo -n "PHP: "
php --version
echo -n "Composer: "
composer --version

# Check services
echo "Checking services..."
echo -n "PostgreSQL: "
pg_isready -h postgres -p 5432 && echo "OK" || echo "Not available"

echo -n "Redis: "
redis-cli -h redis ping && echo "OK" || echo "Not available"

echo -n "API: "
curl -s http://api:4000 > /dev/null && echo "OK" || echo "Not available"

echo -n "Web UI: "
curl -s http://web:3000 > /dev/null && echo "OK" || echo "Not available"

# Check AI tools
echo "Checking AI tools..."
if [ -f "/workspace/.mcp/mcp_settings.json" ]; then
    echo "MCP settings: Found"
    if grep -q '"apiKeysConfigured": true' "/workspace/.mcp/mcp_settings.json"; then
        echo "API keys: Configured"
    else
        echo "API keys: Not configured"
    fi
else
    echo "MCP settings: Not found"
fi

# Check source code
echo "Checking source code..."
if [ -d "/workspace/packages/api" ]; then
    echo "API package: Found"
    if [ -d "/workspace/packages/api/node_modules" ]; then
        echo "API dependencies: Installed"
    else
        echo "API dependencies: Not installed"
    fi
else
    echo "API package: Not found"
fi

if [ -d "/workspace/packages/web" ]; then
    echo "Web package: Found"
    if [ -d "/workspace/packages/web/node_modules" ]; then
        echo "Web dependencies: Installed"
    else
        echo "Web dependencies: Not installed"
    fi
else
    echo "Web package: Not found"
fi

echo "Setup test complete."

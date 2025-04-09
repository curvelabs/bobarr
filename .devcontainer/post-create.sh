#!/bin/bash
set -e

echo "Setting up Bobarr development environment..."

# Create .mcp directory for AI tools
mkdir -p /workspace/.mcp

# Process environment secrets
if [ -f "/workspace/.env.secrets" ]; then
    echo "Loading API keys from .env.secrets..."
    
    # Add API keys to main .env file
    cat /workspace/.env.secrets >> /workspace/.env
    
    # Extract API keys for mcp_settings.json
    if grep -q "ANTHROPIC_API_KEY" "/workspace/.env.secrets"; then
        ANTHROPIC_API_KEY=$(grep "ANTHROPIC_API_KEY" "/workspace/.env.secrets" | cut -d '=' -f2)
    fi
    
    if grep -q "OPENAI_API_KEY" "/workspace/.env.secrets"; then
        OPENAI_API_KEY=$(grep "OPENAI_API_KEY" "/workspace/.env.secrets" | cut -d '=' -f2)
    fi
    
    # Create mcp_settings.json
    cat > /workspace/.mcp/mcp_settings.json << EOF
{
  "defaultModel": "claude-3-5-sonnet-20240620",
  "defaultSystemPrompt": "You are Claude, an AI assistant created by Anthropic to be helpful, harmless, and honest.",
  "anthropicApiKey": "${ANTHROPIC_API_KEY:-}",
  "openaiApiKey": "${OPENAI_API_KEY:-}",
  "apiKeysConfigured": true
}
EOF
    echo "API keys configured."
else
    echo "No .env.secrets file found. Creating template mcp_settings.json."
    cat > /workspace/.mcp/mcp_settings.json << EOF
{
  "defaultModel": "claude-3-5-sonnet-20240620",
  "defaultSystemPrompt": "You are Claude, an AI assistant created by Anthropic to be helpful, harmless, and honest.",
  "anthropicApiKey": "",
  "openaiApiKey": "",
  "apiKeysConfigured": false
}
EOF
fi

# Install project dependencies
if [ -f "/workspace/package.json" ]; then
    echo "Installing project dependencies..."
    cd /workspace
    yarn install
fi

# Set up API package if exists
if [ -d "/workspace/packages/api" ]; then
    echo "Setting up API package..."
    cd /workspace/packages/api
    yarn install
fi

# Set up web package if exists
if [ -d "/workspace/packages/web" ]; then
    echo "Setting up web package..."
    cd /workspace/packages/web
    yarn install
fi

# Return to workspace root
cd /workspace

echo "Setup complete! Available services:"
echo "- Web UI: http://localhost:3000"
echo "- API: http://localhost:4000"
echo "- Transmission: http://localhost:9091"
echo "- Jackett: http://localhost:9117"
echo "- FlareSolverr: http://localhost:8191"

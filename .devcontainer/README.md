# Bobarr Development Container

This devcontainer integrates the layered devcontainer system with Bobarr's Docker Compose stack.

## Architecture

1. **Base Layer**: Core development tools and settings
2. **Agentic Layer**: AI development capabilities 
3. **Project Layer**: Bobarr-specific configuration

## Structure

```
.devcontainer/
├── Dockerfile          # Container definition
├── devcontainer.json   # Configuration
├── docker-compose.extend.yml  # Docker Compose overrides
└── post-create.sh      # Setup script
```

## Features

- Complete Bobarr stack running in development mode
- Node.js development environment
- AI agent tools from agentic layer
- Custom keybindings and settings from base layer
- Multi-repository access for GitHub Codespaces

## Services

- **workspace**: Development container
- **api**: Bobarr API
- **web**: Bobarr UI
- **postgres**: Database
- **redis**: Cache
- **jackett**: Torrent indexer proxy
- **transmission**: Torrent client
- **flaresolverr**: Cloudflare bypass

## Ports

- Web UI: 3000
- API: 4000
- PostgreSQL: 5432
- Redis: 6379
- Transmission Web: 9091
- Jackett: 9117
- FlareSolverr: 8191

## Environment Variables

The container loads variables from:
1. Project `.env` file
2. Mounted `.env.secrets` from host

## Development Workflow

1. Open in container/codespace
2. Development dependencies install automatically
3. Modify code and test in real-time
4. Access services via mapped ports

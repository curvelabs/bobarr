#!/bin/bash

# Only create the standard devcontainer workspace path
mkdir -p /workspaces/bobarr

# Ensure permissions are correct
chmod 755 /workspaces 2>/dev/null || true
chmod 755 /workspaces/bobarr 2>/dev/null || true

echo "Workspace path set to /workspaces/bobarr"

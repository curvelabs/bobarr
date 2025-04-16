#!/bin/bash
set -e

# Source NVM
export NVM_DIR="/usr/local/share/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Ensure we're in the correct directory
mkdir -p /workspaces/bobarr
cd /workspaces/bobarr

# Create symbolic link from root to workspace folder to fix default path issue
if [ ! -L "/.vscode-remote" ] && [ -d "/.vscode-remote" ]; then
  # Move existing remote folder
  mv /.vscode-remote /.vscode-remote-backup
  # Create symbolic link to force workspace folder
  ln -sf /workspaces/bobarr/.vscode-remote /.vscode-remote
fi

# Docker socket fix
SOCAT_PATH=$(which socat)
if [ -n "${SOCAT_PATH}" ]; then
  echo "Starting socat process to proxy docker socket..."
  sudo rm -rf /var/run/docker-host.sock
  sudo -b socat UNIX-LISTEN:/var/run/docker-host.sock,fork,mode=660,user=vscode UNIX-CONNECT:/var/run/docker.sock
  sudo chown -R vscode:vscode /var/run/docker-host.sock
fi

# Execute CMD
echo "Bobarr development container started in $(pwd)"
exec "$@"

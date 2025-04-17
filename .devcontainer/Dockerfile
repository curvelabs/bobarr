FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install essential tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl wget git git-lfs jq build-essential \
    apt-transport-https software-properties-common \
    ca-certificates gnupg lsb-release socat \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# # Install Docker CLI and Docker Compose
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && mkdir -p /etc/apt/keyrings \
#     && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
#     && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list \
#     && apt-get update \
#     && apt-get install -y docker-ce-cli docker-buildx-plugin docker-compose-plugin \
#     && apt-get clean -y \
#     && rm -rf /var/lib/apt/lists/* \
#     && ln -s /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose || true

# Create docker socket directory
RUN mkdir -p /var/run/ \
    && touch /var/run/docker-host.sock \
    && ln -s /var/run/docker-host.sock /var/run/docker.sock

# Install Node.js with nvm
# ENV NVM_DIR=/usr/local/share/nvm
# RUN mkdir -p ${NVM_DIR} \
#     && curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash \
#     && . ${NVM_DIR}/nvm.sh \
#     && nvm install --lts \
#     && nvm alias default lts/* \
#     && npm install -g yarn pnpm

# Set up user and workspace
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if ! getent group ${USERNAME}; then groupadd --gid $USER_GID $USERNAME; fi \
    && if ! getent passwd ${USERNAME}; then useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME; fi \
    && mkdir -p /workspaces \
    && chown -R $USERNAME:$USERNAME /workspaces \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# # Add environment setup to profile
# RUN echo 'export NVM_DIR="/usr/local/share/nvm"' >> /home/$USERNAME/.bashrc \
#     && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/$USERNAME/.bashrc

# Add container entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Switch to non-root user
USER $USERNAME
WORKDIR /workspaces/bobarr

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["sleep", "infinity"]

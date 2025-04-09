FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Best practice: Combine commands to reduce layers
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl wget git git-lfs jq build-essential \
    apt-transport-https software-properties-common \
    ca-certificates gnupg lsb-release \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js with nvm
ENV NVM_DIR=/usr/local/share/nvm
RUN mkdir -p ${NVM_DIR} \
    && curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash \
    && . ${NVM_DIR}/nvm.sh \
    && nvm install --lts \
    && nvm alias default lts/* \
    && npm install -g yarn pnpm

# Install PHP in smaller batches to avoid disk space issues
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends php php-cli php-common \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    && apt-get -y install --no-install-recommends php-curl php-mbstring php-mysql \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    && apt-get -y install --no-install-recommends php-xml php-zip php-bcmath \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    && apt-get -y install --no-install-recommends php-gd php-intl php-sqlite3 \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set up user and workspace
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && mkdir -p /workspace /workspace/.mcp \
    && chown -R $USERNAME:$USERNAME /workspace \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Add environment setup to profile
RUN echo 'export NVM_DIR="/usr/local/share/nvm"' >> /home/$USERNAME/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/$USERNAME/.bashrc

# Switch to non-root user
USER $USERNAME
WORKDIR /workspace

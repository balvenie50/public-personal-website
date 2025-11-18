#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Set default values if not provided in environment
DEPLOY_USER=${DEPLOY_USER:-$USER}
DEPLOY_NODE_PATH=${DEPLOY_NODE_PATH:-$(dirname $(dirname $(which node)))}

echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Start the server with PM2
echo "🚀 Starting server with PM2..."
pm2 start ecosystem.config.cjs --env production

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 to start on boot (requires sudo)
echo "🔧 Setting up PM2 to start on boot..."
if command -v pm2 &> /dev/null; then
  PM2_PATH=$(which pm2)
  NODE_BIN=$(dirname $(which node))
  
  echo "Using Node path: $NODE_BIN"
  echo "Using PM2 path: $PM2_PATH"
  
  # Only run if we have sudo access
  if sudo -n true 2>/dev/null; then
    sudo env PATH=$PATH:$NODE_BIN $PM2_PATH startup systemd -u $DEPLOY_USER --hp $HOME
  else
    echo "⚠️  Skipping PM2 startup configuration (requires sudo)"
    echo "   Run manually: sudo env PATH=\$PATH:$NODE_BIN $PM2_PATH startup systemd -u $DEPLOY_USER --hp $HOME"
  fi
else
  echo "⚠️  PM2 not found in PATH, skipping startup configuration"
fi

echo "✅ Deployment complete!"
echo "🌐 Your website should be running on port 3000"
echo "📊 Check status with: pm2 status"
echo "📝 View logs with: pm2 logs personal-website" 

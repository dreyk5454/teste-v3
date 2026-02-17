#!/bin/bash

# Multi Lives - Setup Script

echo "🎬 Multi Lives - Setup Script"
echo "=============================="
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker found"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker Compose found"

# Ask if user wants to start with Docker
read -p "Do you want to start services with Docker Compose? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting services with Docker Compose..."
    docker-compose up --build
else
    echo ""
    echo "📝 Manual Setup Instructions:"
    echo ""
    echo "Backend:"
    echo "  cd backend"
    echo "  npm install"
    echo "  cp .env.example .env"
    echo "  npm run start:dev"
    echo ""
    echo "Frontend:"
    echo "  cd frontend"
    echo "  npm install"
    echo "  cp .env.example .env.local"
    echo "  npm run dev"
    echo ""
    echo "Access:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend: http://localhost:3000"
fi

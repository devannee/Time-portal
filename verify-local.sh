#!/bin/bash

echo "🔍 Verifying Local Mode Setup..."
echo "================================"

# Check if APP_MODE is set to local
if grep -q "APP_MODE=\"local\"" .env.local; then
    echo "✅ APP_MODE is set to 'local'"
else
    echo "❌ APP_MODE is not set to 'local'"
    echo "Please set APP_MODE=\"local\" in .env.local"
    exit 1
fi

# Check if data directory exists
if [ ! -d "data" ]; then
    echo "📁 Creating data directory..."
    mkdir -p data
    echo "✅ Data directory created"
else
    echo "✅ Data directory exists"
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies installed"
fi

echo ""
echo "🎉 Local mode setup verified!"
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "Your app will work just like before:"
echo "  - Data stored in JSON files"
echo "  - No database required"
echo "  - All themes available"
echo "  - Enhanced UI and features"

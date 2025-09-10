#!/bin/bash

echo "🚀 Time Portal - Multi-User Setup"
echo "=================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    echo "Please create .env.local with your database and Google OAuth credentials"
    echo "See DEPLOYMENT.md for details"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️ Setting up database..."
npx prisma migrate dev --name init

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update .env.local with your actual credentials"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000"
echo ""
echo "📚 See DEPLOYMENT.md for deployment instructions"

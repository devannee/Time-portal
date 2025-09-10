# Database Setup Script

echo "Setting up PostgreSQL database for Time Portal..."

# Generate Prisma client
npx prisma generate

# Create database migration
npx prisma migrate dev --name init

echo "Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your actual PostgreSQL connection string"
echo "2. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local"
echo "3. Generate a secure NEXTAUTH_SECRET"
echo "4. Run: npm run dev"

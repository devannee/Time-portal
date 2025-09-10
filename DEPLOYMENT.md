# Time Portal - Multi-User Deployment Guide

## 🚀 Features Added

- **Google Authentication**: Secure login with Google OAuth
- **Multi-User Support**: Each user has their own time tracking data
- **Database Integration**: PostgreSQL with Prisma ORM
- **User Preferences**: Theme and dark mode settings persist per user
- **Secure API**: All endpoints require authentication

## 📋 Prerequisites

1. **PostgreSQL Database**: Either local or cloud (Supabase, Neon, etc.)
2. **Google Cloud Console**: For OAuth credentials
3. **Node.js**: Version 14 or higher

## 🔧 Setup Instructions

### 1. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL locally
# Create database: createdb timeportal
# Update DATABASE_URL in .env.local
```

#### Option B: Cloud Database (Recommended)
- **Supabase**: Free tier available
- **Neon**: Serverless PostgreSQL
- **Railway**: Easy deployment
- **Vercel Postgres**: Integrated with Vercel

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 3. Environment Variables

Update `.env.local`:
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/timeportal"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"  # Update for production
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### 4. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Optional: View database in Prisma Studio
npx prisma studio
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Run Development Server

```bash
npm run dev
```

## 🌐 Production Deployment

### Vercel (Recommended)

1. **Connect GitHub**: Push code to GitHub repository
2. **Import to Vercel**: Connect your repository
3. **Environment Variables**: Add all variables from `.env.local`
4. **Database**: Use Vercel Postgres or external provider
5. **Domain**: Configure custom domain if needed

### Docker Deployment

```dockerfile
# Dockerfile (if needed)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Security Features

- **Authentication Required**: All time tracking data requires login
- **User Isolation**: Users can only access their own data
- **Secure Sessions**: Database-based sessions with NextAuth.js
- **API Protection**: All API routes validate user authentication

## 📊 Database Schema

```prisma
User {
  id            String
  name          String?
  email         String    @unique
  image         String?
  theme         String    @default("pinkBlush")
  darkMode      Boolean   @default(false)
  timeEntries   TimeEntry[]
}

TimeEntry {
  id        String
  userId    String
  date      DateTime
  checkIn   DateTime
  checkOut  DateTime?
  user      User
}
```

## 🎨 Theme System

- **8 Color Themes**: Pink Blush, Warm Peach, Nature Green, etc.
- **Light/Dark Modes**: Each theme has light and dark variants
- **User Persistence**: Theme preferences saved per user
- **Real-time Sync**: Changes sync across devices

## 🔧 API Endpoints

```
GET    /api/time-entries/[date]     # Get entries for date
POST   /api/time-entries/[date]     # Create new entry
PUT    /api/time-entries/entry/[id] # Update entry
DELETE /api/time-entries/entry/[id] # Delete entry
GET    /api/user/preferences        # Get user preferences
PUT    /api/user/preferences        # Update user preferences
```

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop browsers
- Mobile devices
- Tablets

## 🚀 Performance Optimizations

- **Database Indexing**: Optimized queries for user data
- **Session Management**: Efficient session handling
- **API Caching**: Reduced database calls
- **Client-side State**: Smooth user experience

## 🔄 Migration from File-based Storage

Existing time tracking data can be migrated:
1. Export current JSON files
2. Create user account
3. Import data via API or database script

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Check DATABASE_URL
2. **OAuth Errors**: Verify Google credentials
3. **Session Issues**: Clear browser cookies
4. **Build Errors**: Run `npx prisma generate`

### Logs

Check application logs for detailed error information:
```bash
# Development
npm run dev

# Production
npm run build && npm start
```

## 📈 Monitoring

For production, consider:
- **Error Tracking**: Sentry, LogRocket
- **Performance**: Vercel Analytics
- **Database**: PostgreSQL monitoring
- **Uptime**: Pingdom, UptimeRobot

## 🔐 Backup Strategy

1. **Database Backups**: Regular PostgreSQL dumps
2. **User Data**: Export functionality
3. **Configuration**: Environment variables backup

## 🎯 Future Enhancements

- Export/Import functionality
- Team collaboration features
- Advanced reporting
- API webhooks
- Mobile app

# Time Portal - Multi-User Time Tracking Application

A beautiful, feature-rich time tracking application with Google authentication, multi-user support, and comprehensive theming system.

## ✨ Features

- **🔐 Google Authentication**: Secure login with Google OAuth
- **👥 Multi-User Support**: Each user has isolated time tracking data
- **🎨 8 Beautiful Themes**: Pink Blush, Warm Peach, Nature Green, and more
- **🌙 Dark/Light Mode**: Each theme has light and dark variants
- **📊 Real-time Tracking**: Live time tracking with automatic calculations
- **📅 Interactive Calendar**: Easy date selection and navigation
- **📱 Mobile Responsive**: Works perfectly on all devices
- **🗄️ Database Backed**: PostgreSQL with Prisma ORM
- **☁️ Cloud Ready**: Easy deployment to Vercel, Railway, etc.

## 🚀 Quick Start

1. **Clone and Install**:
   ```bash
   git clone <repository>
   cd time-portal-new-09
   npm install
   ```

2. **Setup Environment**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Setup Database**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)**: Complete deployment guide
- **[Database Schema](prisma/schema.prisma)**: Database structure
- **[API Documentation](#api-endpoints)**: API reference

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Custom CSS with CSS Variables
- **Deployment**: Vercel, Railway, or Docker

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/timeportal"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

## 🎨 Theme System

### Available Themes

1. **Pink Blush** - Soft pink and coral tones
2. **Warm Peach** - Warm orange and peach colors
3. **Nature Green** - Fresh green and earth tones
4. **Autumn Warmth** - Rich browns and oranges
5. **Ocean Breeze** - Cool blues and teals
6. **Sunset Dreams** - Purple and pink gradients
7. **Cyan Tech** - Modern cyan and blue
8. **Classic Blue** - Professional blue tones

Each theme includes:
- **Light Mode**: Bright, clean interface
- **Dark Mode**: Easy on the eyes for low-light use
- **Automatic Sync**: Preferences saved per user

## 📊 API Endpoints

```
GET    /api/time-entries/[date]     # Get entries for specific date
POST   /api/time-entries/[date]     # Create new time entry
PUT    /api/time-entries/entry/[id] # Update existing entry
DELETE /api/time-entries/entry/[id] # Delete entry
GET    /api/user/preferences        # Get user theme preferences
PUT    /api/user/preferences        # Update user preferences
```

## 🔐 Security Features

- **Authenticated Access**: All data requires Google login
- **User Isolation**: Users can only access their own data
- **Secure Sessions**: Database-based session management
- **API Protection**: All endpoints validate authentication
- **CSRF Protection**: Built-in with NextAuth.js

## 📱 Mobile Support

The application is fully responsive and includes:
- Touch-friendly interface
- Mobile-optimized calendar
- Gesture support
- Offline capability (coming soon)

## 🚀 Deployment Options

### 1. Vercel (Recommended)
- One-click deployment
- Automatic SSL
- Edge functions
- Built-in analytics

### 2. Railway
- Simple PostgreSQL setup
- Automatic deployments
- Custom domains

### 3. Docker
- Containerized deployment
- Easy scaling
- Environment isolation

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/username/time-portal/issues)
- **Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Discussions**: [GitHub Discussions](https://github.com/username/time-portal/discussions)

## 🎯 Roadmap

- [ ] Export/Import functionality
- [ ] Team collaboration features
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] API webhooks
- [ ] Time tracking reminders
- [ ] Project categorization

---

Made with ❤️ for productive time tracking

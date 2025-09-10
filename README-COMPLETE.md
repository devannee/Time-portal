# 🕐 Time Portal - Advanced Time Tracking Application

A beautiful, feature-rich time tracking application that works both as a simple local tool and a multi-user cloud solution. Track your work hours with style using 8 stunning themes, each with light and dark mode variants.

![Time Portal Interface](https://via.placeholder.com/800x400/6366f1/ffffff?text=Time+Portal+Interface)

## ✨ Features

- **🕐 Precise Time Tracking**: Check-in/out with live time calculations
- **📅 Interactive Calendar**: Easy date navigation and selection
- **🎨 8 Beautiful Themes**: Pink Blush, Warm Peach, Nature Green, Autumn Warmth, Ocean Breeze, Sunset Dreams, Cyan Tech, Classic Blue
- **🌙 Light/Dark Modes**: Each theme has both light and dark variants
- **📊 Detailed Logs**: View all your time entries with edit/delete capabilities
- **📱 Mobile Responsive**: Works perfectly on all devices
- **🔄 Real-time Updates**: Live time tracking with automatic refresh
- **📈 Daily Summaries**: Total hours, sessions, and current status
- **🎯 Dual Mode Support**: Local file storage OR cloud database with multi-user support

## 🚀 Two Ways to Run This Application

### 🏠 **Option 1: Local Mode (Simple & Fast)**
*Perfect for personal use, no setup required*

### 🌐 **Option 2: Database Mode (Multi-User & Cloud)**
*For teams, deployment, and advanced features*

---

## 🏠 Local Mode Setup (Recommended for Getting Started)

### **Prerequisites**
- Node.js (version 14 or higher)
- npm or yarn

### **Quick Start**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd time-portal-new-09
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Local Mode**
   
   Edit `.env.local` file:
   ```bash
   # Set to local mode
   APP_MODE="local"
   
   # Optional: Enable simple authentication
   ENABLE_AUTH=false
   AUTH_USERNAME=admin
   AUTH_PASSWORD=password123
   ```

4. **Start the Application**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   ```
   Open: http://localhost:3000
   ```

### **What You Get in Local Mode**
- ✅ **Instant Setup**: No database or OAuth configuration needed
- ✅ **File Storage**: Data saved in JSON files (`data/` folder)
- ✅ **All Features**: Complete time tracking, themes, calendar
- ✅ **Optional Auth**: Simple username/password protection
- ✅ **Offline Capable**: Works without internet connection
- ✅ **Fast Performance**: Direct file access, no network calls

### **Local Mode File Structure**
```
time-portal-new-09/
├── data/
│   ├── 2025-07-16.json    # Your time entries
│   ├── 2025-07-17.json
│   └── ...
├── src/
└── package.json
```

### **Local Mode Configuration Options**

#### **Basic Configuration** (`.env.local`)
```bash
# Application Mode
APP_MODE="local"

# Authentication (Optional)
ENABLE_AUTH=false           # Set to true for login protection
AUTH_USERNAME=admin         # Your username
AUTH_PASSWORD=password123   # Your password

# Development
NODE_ENV="development"
```

#### **With Simple Authentication**
```bash
APP_MODE="local"
ENABLE_AUTH=true
AUTH_USERNAME=your_username
AUTH_PASSWORD=your_secure_password
```

---

## 🌐 Database Mode Setup (For Production & Multi-User)

### **Prerequisites**
- Node.js (version 14 or higher)
- PostgreSQL database (local or cloud)
- Google Cloud Console account (for OAuth)

### **Step 1: Database Setup**

#### **Option A: Supabase (Recommended)**
1. Go to [https://supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Settings → Database
5. Copy the connection string

#### **Option B: Local PostgreSQL**
```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb timeportal

# Connection string format:
# postgresql://username:password@localhost:5432/timeportal
```

#### **Option C: Cloud Providers**
- **Neon**: [https://neon.tech](https://neon.tech) (Serverless PostgreSQL)
- **Railway**: [https://railway.app](https://railway.app) (Full-stack platform)
- **PlanetScale**: [https://planetscale.com](https://planetscale.com) (MySQL alternative)

### **Step 2: Google OAuth Setup**

1. **Google Cloud Console**
   - Go to [https://console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project or select existing

2. **Enable Google+ API**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

3. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Time Portal"

4. **Configure Redirect URIs**
   ```
   Authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google (development)
   - https://yourdomain.com/api/auth/callback/google (production)
   ```

5. **Copy Credentials**
   - Save the Client ID and Client Secret

### **Step 3: Environment Configuration**

Edit `.env.local`:
```bash
# Application Mode
APP_MODE="database"

# Database Connection
DATABASE_URL="postgresql://username:password@host:5432/database"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Environment
NODE_ENV="development"
```

### **Step 4: Generate Secret Key**
```bash
# Generate secure NEXTAUTH_SECRET
openssl rand -base64 32

# Or visit: https://generate-secret.vercel.app/32
```

### **Step 5: Database Migration**
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Optional: View database in Prisma Studio
npx prisma studio
```

### **Step 6: Start the Application**
```bash
npm run dev
```

### **What You Get in Database Mode**
- ✅ **Multi-User Support**: Each user has isolated data
- ✅ **Google Authentication**: Secure OAuth login
- ✅ **Cloud Storage**: PostgreSQL database
- ✅ **User Profiles**: Display name, email, avatar
- ✅ **Theme Sync**: Preferences saved per user
- ✅ **Production Ready**: Deploy to Vercel, Railway, etc.
- ✅ **Scalable**: Supports unlimited users

---

## 🎨 Theme System

### **Available Themes**

1. **Pink Blush** 🌸
   - Light: Soft pink and coral tones
   - Dark: Deep rose with warm accents

2. **Warm Peach** 🍑
   - Light: Warm orange and peach colors
   - Dark: Rich amber with golden highlights

3. **Nature Green** 🌿
   - Light: Fresh green and earth tones
   - Dark: Forest green with natural accents

4. **Autumn Warmth** 🍂
   - Light: Rich browns and oranges
   - Dark: Deep autumn colors

5. **Ocean Breeze** 🌊
   - Light: Cool blues and teals
   - Dark: Deep ocean blues

6. **Sunset Dreams** 🌅
   - Light: Purple and pink gradients
   - Dark: Deep purples with magenta

7. **Cyan Tech** 💻
   - Light: Modern cyan and blue
   - Dark: Electric blue with tech vibes

8. **Classic Blue** 📘
   - Light: Professional blue tones
   - Dark: Navy blue with silver accents

### **Theme Features**
- **Seamless Switching**: Change themes instantly
- **Persistent Settings**: Themes saved automatically
- **Responsive Design**: Works on all screen sizes
- **CSS Variables**: Smooth color transitions

---

## 🛠️ Development & Deployment

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database (Database Mode Only)
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:push      # Push schema to database
npm run db:reset     # Reset database

# Utilities
npm run lint         # Run ESLint
```

### **Deployment Options**

#### **Vercel (Recommended)**
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy time portal"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Environment Variables for Vercel**
   ```bash
   APP_MODE=database
   DATABASE_URL=your-database-url
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

#### **Railway**
1. Connect GitHub repository
2. Add PostgreSQL service
3. Configure environment variables
4. Deploy

#### **Docker**
```dockerfile
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

---

## 📊 Database Schema (Database Mode)

```sql
-- Users table
CREATE TABLE User (
  id            TEXT PRIMARY KEY,
  name          TEXT,
  email         TEXT UNIQUE NOT NULL,
  emailVerified TIMESTAMP,
  image         TEXT,
  theme         TEXT DEFAULT 'pinkBlush',
  darkMode      BOOLEAN DEFAULT false,
  createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Time entries table
CREATE TABLE TimeEntry (
  id        TEXT PRIMARY KEY,
  userId    TEXT NOT NULL,
  date      TIMESTAMP NOT NULL,
  checkIn   TIMESTAMP NOT NULL,
  checkOut  TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Additional tables for NextAuth.js
-- Account, Session, VerificationToken
```

---

## 📱 API Reference

### **Local Mode APIs**
```
GET    /api/timeEntries?date=YYYY-MM-DD    # Get entries for date
POST   /api/timeEntries                    # Create new entry
PUT    /api/timeEntries                    # Update entry
DELETE /api/timeEntries                    # Delete entry
```

### **Database Mode APIs**
```
GET    /api/time-entries/[date]            # Get user entries for date
POST   /api/time-entries/[date]            # Create new entry
PUT    /api/time-entries/entry/[id]        # Update entry
DELETE /api/time-entries/entry/[id]        # Delete entry
GET    /api/user/preferences               # Get user preferences
PUT    /api/user/preferences               # Update user preferences
POST   /api/auth/signin                    # Google OAuth signin
POST   /api/auth/signout                   # Sign out
```

---

## 🔧 Configuration Reference

### **Environment Variables**

| Variable | Local Mode | Database Mode | Description |
|----------|------------|---------------|-------------|
| `APP_MODE` | `"local"` | `"database"` | Application mode |
| `ENABLE_AUTH` | `true/false` | N/A | Simple auth for local mode |
| `AUTH_USERNAME` | Required if auth enabled | N/A | Local mode username |
| `AUTH_PASSWORD` | Required if auth enabled | N/A | Local mode password |
| `DATABASE_URL` | N/A | Required | PostgreSQL connection string |
| `NEXTAUTH_URL` | N/A | Required | Application URL |
| `NEXTAUTH_SECRET` | N/A | Required | JWT secret key |
| `GOOGLE_CLIENT_ID` | N/A | Required | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | N/A | Required | Google OAuth client secret |

### **Feature Comparison**

| Feature | Local Mode | Database Mode |
|---------|------------|---------------|
| **Setup Time** | < 5 minutes | 15-30 minutes |
| **Data Storage** | JSON files | PostgreSQL |
| **Authentication** | Optional simple | Google OAuth |
| **Multi-User** | ❌ | ✅ |
| **Cloud Sync** | ❌ | ✅ |
| **Offline** | ✅ | ❌ |
| **Scalability** | Single user | Unlimited users |
| **Deployment** | Not needed | Vercel/Railway |
| **Themes** | ✅ (localStorage) | ✅ (per user) |
| **Mobile** | ✅ | ✅ |

---

## 🔄 Switching Between Modes

### **From Local to Database Mode**
1. Change `APP_MODE="database"` in `.env.local`
2. Setup database and Google OAuth
3. Run `npx prisma migrate dev --name init`
4. Restart application

### **From Database to Local Mode**
1. Change `APP_MODE="local"` in `.env.local`
2. Your JSON files are preserved
3. Restart application

---

## 🛠️ Troubleshooting

### **Common Issues**

#### **Local Mode**
- **Error: Cannot read file**: Check `data/` folder permissions
- **Port already in use**: Use `npm run dev -- -p 3001`
- **Theme not saving**: Check localStorage in browser

#### **Database Mode**
- **Database connection error**: Verify `DATABASE_URL` format
- **Google OAuth error**: Check client ID/secret and redirect URIs
- **Migration failed**: Ensure database exists and is accessible
- **Build error**: Run `npx prisma generate`

### **Debug Steps**

1. **Check Environment Variables**
   ```bash
   cat .env.local
   ```

2. **Verify Database Connection** (Database Mode)
   ```bash
   npx prisma studio
   ```

3. **Check Logs**
   ```bash
   npm run dev
   # Check console for errors
   ```

4. **Reset Database** (Database Mode)
   ```bash
   npx prisma migrate reset
   ```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test both modes**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### **Development Guidelines**
- Test both local and database modes
- Ensure mobile responsiveness
- Follow existing code style
- Add appropriate comments
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

- **Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md), [QUICK-START.md](QUICK-START.md)
- **Issues**: [GitHub Issues](https://github.com/username/time-portal/issues)
- **Discussions**: [GitHub Discussions](https://github.com/username/time-portal/discussions)

---

## 🎯 Roadmap

### **Upcoming Features**
- [ ] **Export/Import**: CSV, Excel, PDF exports
- [ ] **Time Categories**: Project categorization
- [ ] **Reporting**: Advanced analytics and charts
- [ ] **Team Features**: Shared workspaces
- [ ] **Mobile App**: React Native version
- [ ] **Integrations**: Slack, Discord, webhooks
- [ ] **Reminders**: Break and work reminders
- [ ] **Goals**: Daily/weekly time goals

### **Technical Improvements**
- [ ] **Offline Support**: PWA capabilities
- [ ] **Performance**: Optimize for large datasets
- [ ] **Testing**: Comprehensive test suite
- [ ] **Documentation**: Video tutorials
- [ ] **Localization**: Multi-language support

---

## 🌟 Why Time Portal?

- **🎨 Beautiful**: 8 stunning themes with light/dark modes
- **⚡ Fast**: Optimized for performance
- **🛡️ Secure**: Google OAuth and data protection
- **📱 Modern**: Mobile-first responsive design
- **🔧 Flexible**: Local or cloud deployment
- **🚀 Production Ready**: Scalable and reliable

---

**Start tracking your time in style! Choose your mode and get started in minutes.** 🎉

Made with ❤️ for productive time tracking.

# 🕐 Time Portal - Advanced Time Tracking Application

A beautiful, feature-rich time tracking application that works both as a simple local tool and a multi-user cloud solution. Track your work hours with style using 8 stunning themes, each with light and dark mode variants.

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
   
   Create or edit `.env.local` file:
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
# Install PostgreSQL and create database
createdb timeportal

# Connection string format:
# postgresql://username:password@localhost:5432/timeportal
```

### **Step 2: Google OAuth Setup**

1. **Google Cloud Console**
   - Go to [https://console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project

2. **Enable Google+ API**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable

3. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Create "OAuth client ID"
   - Add redirect URI: `http://localhost:3000/api/auth/callback/google`

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
```

### **Step 4: Database Migration**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start the application
npm run dev
```

### **What You Get in Database Mode**
- ✅ **Multi-User Support**: Each user has isolated data
- ✅ **Google Authentication**: Secure OAuth login
- ✅ **Cloud Storage**: PostgreSQL database
- ✅ **User Profiles**: Display name, email, avatar
- ✅ **Theme Sync**: Preferences saved per user
- ✅ **Production Ready**: Deploy to Vercel, Railway, etc.

---

## 🎨 Available Themes

1. **Pink Blush** 🌸 - Soft pink and coral tones
2. **Warm Peach** 🍑 - Warm orange and peach colors
3. **Nature Green** 🌿 - Fresh green and earth tones
4. **Autumn Warmth** 🍂 - Rich browns and oranges
5. **Ocean Breeze** 🌊 - Cool blues and teals
6. **Sunset Dreams** 🌅 - Purple and pink gradients
7. **Cyan Tech** 💻 - Modern cyan and blue
8. **Classic Blue** 📘 - Professional blue tones

*Each theme includes both light and dark mode variants*

---

## 🔄 Switching Between Modes

### **From Local to Database Mode**
1. Change `APP_MODE="database"` in `.env.local`
2. Setup database and Google OAuth
3. Run `npx prisma migrate dev --name init`
4. Restart application

### **From Database to Local Mode**
1. Change `APP_MODE="local"` in `.env.local`
2. Restart application

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database (Database Mode Only)
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

---

## 📊 Feature Comparison

| Feature | Local Mode | Database Mode |
|---------|------------|---------------|
| **Setup Time** | < 5 minutes | 15-30 minutes |
| **Data Storage** | JSON files | PostgreSQL |
| **Authentication** | Optional simple | Google OAuth |
| **Multi-User** | ❌ | ✅ |
| **Cloud Sync** | ❌ | ✅ |
| **Offline** | ✅ | ❌ |
| **Themes** | ✅ | ✅ |
| **Mobile** | ✅ | ✅ |

---

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### **Railway**
1. Connect GitHub repository
2. Add PostgreSQL service
3. Configure environment variables
4. Deploy

---

## 🛠️ Troubleshooting

### **Local Mode Issues**
- **Error: Cannot read file**: Check `data/` folder permissions
- **Port already in use**: Use `npm run dev -- -p 3001`

### **Database Mode Issues**
- **Database connection error**: Verify `DATABASE_URL` format
- **Google OAuth error**: Check client ID/secret and redirect URIs
- **Migration failed**: Ensure database exists and is accessible

---

## 📄 License

This project is licensed under the MIT License.

---

**Start tracking your time in style! Choose your mode and get started in minutes.** 🎉

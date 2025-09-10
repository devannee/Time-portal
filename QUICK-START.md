# 🚀 Time Portal - Quick Start Guide

## 🎯 Two Ways to Run This Application

### **Option 1: Simple Local Mode (Just like before!) 🏠**

**Perfect for personal use, no setup required!**

1. **Set Local Mode**:
   Edit `.env.local` and set:
   ```bash
   APP_MODE="local"
   ```

2. **Run the App**:
   ```bash
   npm install
   npm run dev
   ```

3. **That's it!** 🎉
   - Data saves to JSON files (like before)
   - No database required
   - No Google OAuth needed
   - Optional simple authentication
   - All your themes work perfectly

### **Option 2: Multi-User Database Mode 🌐**

**For deployment and multiple users**

1. **Set Database Mode**:
   Edit `.env.local` and set:
   ```bash
   APP_MODE="database"
   ```

2. **Setup Database & OAuth** (see DEPLOYMENT.md for details):
   - Get PostgreSQL database
   - Setup Google OAuth
   - Update environment variables

3. **Run Setup**:
   ```bash
   npm install
   npx prisma migrate dev --name init
   npm run dev
   ```

---

## 🔧 Current Configuration

Your app is currently set to: **`APP_MODE="local"`**

This means:
- ✅ Works immediately with `npm run dev`
- ✅ Data stored in JSON files (like before)
- ✅ No database setup required
- ✅ All themes and features work
- ✅ Optional basic authentication

---

## 🎨 What's New (Available in Both Modes)

- **8 Beautiful Themes** with light/dark variants
- **Better UI** with improved styling
- **Enhanced Calendar** with better navigation
- **Improved Time Tracking** with better calculations
- **Mobile Responsive** design

---

## 🚀 Quick Commands

```bash
# Start in local mode (default)
npm run dev

# View your data files
ls data/

# Change themes
# Use the theme selector in the app

# Switch to database mode later
# Change APP_MODE in .env.local to "database"
```

---

## 📱 Testing Your Local Setup

1. **Start the app**: `npm run dev`
2. **Open browser**: http://localhost:3000
3. **Check-in/out**: Should work immediately
4. **Try themes**: Click the theme button (🎨)
5. **Check data**: Your data is in `data/` folder

---

## 🔄 Switching Between Modes

You can switch between modes anytime by changing `APP_MODE` in `.env.local`:

```bash
# For local file-based storage
APP_MODE="local"

# For database with Google auth
APP_MODE="database"
```

---

## 🆘 Need Help?

**Local Mode Issues:**
- Make sure `APP_MODE="local"` in `.env.local`
- Run `npm install` and `npm run dev`
- Check that `data/` folder is writable

**Database Mode Issues:**
- See DEPLOYMENT.md for full setup
- Make sure database connection works
- Verify Google OAuth credentials

---

## 🎯 Bottom Line

**Just want to use it like before?**
1. Set `APP_MODE="local"` (already set!)
2. Run `npm run dev`
3. Enjoy your enhanced time portal! 🎉

**Want to deploy for multiple users?**
1. Set `APP_MODE="database"`
2. Follow DEPLOYMENT.md
3. Deploy to Vercel/Railway/etc.

Both modes give you all the beautiful themes and enhanced features - the choice is yours! 🌈

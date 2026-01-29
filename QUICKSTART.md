# Quick Start Guide - Flight Booking System

## ⚡ Installation (3 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Open in Browser
Visit: `http://localhost:3000`

---

## 🚀 Getting Started

### First-Time Use

#### Option A: Quick Test (Demo)
1. **Landing Page** appears automatically
2. Click **"GET STARTED"** to sign up
3. Fill form with test data:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `123456`
   - Phone: `555-0123`
4. Click **"Create Account"**

#### Option B: Login (Test Existing)
1. Click **"BOOK NOW"** on landing page
2. Enter credentials:
   - Username: `john@example.com`
   - Password: `123456`
3. Click **"LOGIN"**

---

## 📱 Main Features

### 1. **Search Flights**
- Click "Search Flights" on dashboard
- Fill: From (NYC), To (LAX), Date, Passengers
- Click "SEARCH FLIGHTS"
- See results with 8 flights

### 2. **Sort Results**
- Use dropdown to sort by:
  - Price (Low to High)
  - Duration
  - Rating (Best to Worst)

### 3. **Select Flight**
- Click "SELECT" on any flight
- See flight details in booking page

### 4. **Book Seats**
- Click on seat grid (15 rows × 6 columns)
- Selected seats turn blue
- Choose payment method
- Click "COMPLETE BOOKING"

### 5. **Dark Mode**
- Click 🌙 icon in navbar (top right)
- Click again to return to light mode

### 6. **View Profile**
- Click "Profile" in navbar (after login)
- See personal info and membership details

---

## 🎨 Theme Colors

| Color | Usage |
|-------|-------|
| 🟣 #667eea | Primary (Purple) |
| 🟣 #764ba2 | Secondary (Dark Purple) |
| 🔴 #f093fb | Accent (Pink) |
| 🟢 #48dbfb | Success |
| 🔴 #ff6b6b | Danger/Error |

---

## 🗂️ Project Files

```
src/
├── components/
│   ├── Landing.jsx       ← Welcome page
│   ├── Home.jsx          ← Login
│   ├── Register.jsx      ← Sign up
│   ├── Dashboard.jsx     ← Main hub
│   ├── SearchFlights.jsx ← Search form
│   ├── FlightResults.jsx ← Results
│   ├── BookingPage.jsx   ← Seat selection
│   ├── Profile.jsx       ← User profile
│   ├── Navbar.jsx        ← Navigation
│   └── Footer.jsx        ← Footer
├── data/
│   └── flights.json      ← Flight data
└── App.js                ← Router setup
```

---

## 🔧 Available Scripts

### Development
```bash
npm start              # Start dev server (http://localhost:3000)
npm test              # Run tests
npm run build         # Create production build
npm run eject         # Eject from Create React App (⚠️ irreversible)
```

---

## 💾 Data Storage

User data is saved in browser's **localStorage**:
- Login credentials
- User profile info
- Dark mode preference

**To clear data** (browser console):
```javascript
localStorage.clear();
location.reload();
```

---

## ✨ Animations Used

### Framer Motion
- ✅ Fade-in effects
- ✅ Slide animations
- ✅ Staggered children
- ✅ Hover effects (scale, shadow)
- ✅ Button interactions

### CSS Keyframes
- ✅ Gradient shifting
- ✅ Floating plane (hero)
- ✅ Floating clouds
- ✅ Pulse effects
- ✅ Bounce animations

---

## 🐛 Common Issues & Solutions

### Issue: Blank Page
**Solution**: 
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: Port 3000 In Use
**Solution**:
```bash
PORT=3001 npm start
```

### Issue: Styles Not Loading
**Solution**:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

### Issue: Cannot Login
**Solution**:
- Verify user registered first
- Check localStorage in DevTools → Application tab
- Try signing up again

---

## 📚 Component List

| Component | Purpose | Route |
|-----------|---------|-------|
| Landing | Welcome page | / |
| Home | Login page | /login |
| Register | Sign up page | /register |
| Dashboard | Main hub | /dashboard |
| SearchFlights | Flight search | /search |
| FlightResults | Search results | /results |
| BookingPage | Seat selection | /booking |
| Profile | User profile | /profile |

---

## 🎯 Test Flight Data

### Sample Flight
- Airline: SkyWings Airlines
- Flight: SW101
- From: NYC → To: LAX
- Time: 10:30 AM - 1:45 PM (5h 15m)
- Price: $245
- Aircraft: Boeing 787
- Rating: ⭐ 4.8

*All 8 flights available in FlightResults page*

---

## 📝 Login Credentials (For Testing)

Use these after registration:
- **Email**: john@example.com
- **Password**: 123456

*Note: First register using the signup form*

---

## 🌐 Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📞 Support

For issues or questions:
1. Check [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
2. Review component code with inline comments
3. Check browser Developer Tools (F12) for errors

---

## 🚀 Next Steps

1. ✅ **Explore** all pages (Landing → Login → Dashboard → Search → Results → Booking)
2. ✅ **Test** dark mode toggle
3. ✅ **Try** seat selection
4. ✅ **Review** code in components folder
5. ✅ **Customize** colors and content

---

**Happy Booking!** 🎉

For detailed information, see [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)

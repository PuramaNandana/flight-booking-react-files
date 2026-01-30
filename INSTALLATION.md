# Installation & Setup Guide

## 🎯 Quick Start (3 Steps)

### Step 1: Open Terminal/Command Prompt
Navigate to your project folder:
```bash
cd path/to/flight-booking-react-files
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react & react-dom
- react-router-dom (v7.13)
- framer-motion (v10.16.4)
- lucide-react (icons)

### Step 3: Start Development Server
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

---

## ✅ Prerequisites

Before starting, ensure you have:

### Node.js & npm
- Download from: https://nodejs.org/
- Recommended: LTS version (v18+)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### Code Editor
- VS Code (recommended)
- Or any text editor you prefer

### Git (optional)
- For version control
- Download from: https://git-scm.com/

---

## 📥 Installation Steps

### Method 1: From Scratch

```bash
# 1. Create new React app
npx create-react-app flight-booking

# 2. Navigate into project
cd flight-booking

# 3. Install dependencies
npm install react-router-dom@7.13.0 framer-motion@10.16.4 lucide-react@0.263.1

# 4. Start server
npm start
```

### Method 2: Using Existing Files

```bash
# 1. Navigate to project folder
cd flight-booking-react-files

# 2. Install dependencies (from package.json)
npm install

# 3. Start development server
npm start
```

---

## 🔧 Configuration

### Environment Setup
No additional configuration needed. The project uses default Create React App settings.

### Port Configuration
If port 3000 is in use, you'll be prompted to use another port:
```
Would you like to run the app on another port instead? (Y/n)
```
Press `Y` to automatically use port 3001.

---

## 📁 Project Structure After Installation

```
flight-booking-react-files/
├── node_modules/                 (installed packages)
├── public/
│   ├── index.html               (main HTML file)
│   └── favicon.ico
├── src/
│   ├── components/              (React components)
│   ├── data/                    (flights.json)
│   ├── App.js                   (main app)
│   ├── App.css
│   ├── animations.css           (global animations)
│   ├── index.js
│   └── index.css
├── package.json                 (dependencies)
├── package-lock.json
└── README.md
```

---

## 🚀 Running the Application

### Development Mode
```bash
npm start
```
- Opens at http://localhost:3000
- Hot reload on file changes
- Error overlay in browser

### Production Build
```bash
npm run build
```
Creates optimized build in `build/` folder

### Testing
```bash
npm test
```
Runs Jest test suite

---

## 🐛 Troubleshooting

### Issue: "npm command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or just let React use another port
```

### Issue: Dependencies not installing
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Module not found errors
**Solution**:
```bash
# Ensure all dependencies are installed
npm install

# Check package.json for correct versions
npm list
```

### Issue: Cannot find module 'react-router-dom'
**Solution**:
```bash
npm install react-router-dom@7.13.0
```

---

## 📋 First Time Setup Checklist

- [ ] Node.js installed (v14+)
- [ ] npm/yarn installed
- [ ] Project folder created/extracted
- [ ] Terminal opened in project folder
- [ ] `npm install` completed successfully
- [ ] `npm start` running without errors
- [ ] Browser showing app at localhost:3000
- [ ] All pages loading correctly
- [ ] Dark mode toggle working
- [ ] No console errors

---

## 🎨 Testing the Features

After starting the app:

1. **Landing Page**
   - Click "BOOK NOW" button
   - Should navigate to login

2. **Registration**
   - Click "Sign Up"
   - Fill form and submit
   - Data saved in localStorage

3. **Login**
   - Use registered credentials
   - Redirected to dashboard

4. **Search Flights**
   - Enter route and date
   - View results
   - Sort by price/duration/rating

5. **Booking Flow**
   - Click flight card
   - Select seats
   - Fill passenger details
   - Process payment
   - View confirmation

6. **My Bookings**
   - View booking history
   - See saved bookings

7. **Dark Mode**
   - Toggle in navbar
   - Preference saved

---

## 💻 VS Code Extensions (Recommended)

For better development experience:
- **ES7+ React/Redux** - dsznajder.es7-react-js-snippets
- **Prettier** - esbenp.prettier-vscode
- **ESLint** - dbaeumer.vscode-eslint
- **Tabnine** - TabNine.tabnine-vscode

Install:
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search and install

---

## 📚 Useful Commands

```bash
# View installed versions
npm list

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# View package details
npm info react

# Clear npm cache
npm cache clean --force

# Create production build
npm run build

# View build size
npm run build -- --stats
```

---

## 🔗 Useful Links

- **React Docs**: https://react.dev/
- **Framer Motion**: https://www.framer.com/motion/
- **React Router**: https://reactrouter.com/
- **Lucide Icons**: https://lucide.dev/
- **npm Registry**: https://www.npmjs.com/

---

## ✨ Next Steps

After successful installation:

1. **Explore the code** - Check src/components/
2. **Modify styles** - Update CSS files
3. **Add features** - Create new components
4. **Test thoroughly** - Check all pages
5. **Deploy** - Host on Vercel/Netlify

---

## 📞 Common Questions

**Q: Can I use this for commercial projects?**
A: Yes! This is a demonstration project and can be customized.

**Q: How do I add real flight data?**
A: Replace flights.json or integrate with an API.

**Q: How do I add real payments?**
A: Integrate Stripe, PayPal, or other payment gateways.

**Q: Can I modify the animations?**
A: Yes! Check animations.css and Framer Motion docs.

**Q: How do I deploy this?**
A: See DEPLOYMENT.md for detailed instructions.

---

## 🎉 Success!

If you see the landing page with animated plane and clouds, you're all set!

**Happy coding! ✈️**

---

*Last Updated: January 2026*
*Version: 2.0.0*

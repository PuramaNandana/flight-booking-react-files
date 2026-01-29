# 🛫 React Flight Booking System

> A modern, fully-featured flight booking application built with React, Framer Motion, and advanced CSS animations.

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://react.dev)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.4-orange?logo=framer)](https://www.framer.com/motion)
[![React Router](https://img.shields.io/badge/React%20Router-7.13.0-purple?logo=react-router)](https://reactrouter.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 📸 Features

✨ **Advanced Animations**
- Framer Motion variant system with staggered children
- 15+ CSS keyframe animations
- Smooth hover & tap effects
- Animated gradient backgrounds
- Floating plane & cloud effects
- Glassmorphism UI design

🌓 **Dark Mode**
- CSS variables-based theming
- One-click toggle in navbar
- Persistent across sessions

📱 **Responsive Design**
- Mobile-first approach
- Works on all screen sizes
- Hamburger menu for mobile

🔍 **Flight Management**
- Search with multiple filters
- Sort by price, duration, rating
- Real-time results filtering
- 8 dummy flights included

💺 **Seat Selection**
- 15×6 interactive seat grid
- Real-time price calculation
- Visual feedback on selection
- Payment method selection

📋 **Form Validation**
- Real-time validation
- Clear error messages
- User-friendly feedback

💾 **Data Persistence**
- localStorage for user data
- Session management
- Preference saving

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd flight-booking-react-files

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Test Credentials

**For Testing**:
```
Email: test@example.com
Password: 123456
```

Or create a new account using the registration page.

## 📁 Project Structure

```
src/
├── components/
│   ├── Landing.jsx          # Hero welcome page
│   ├── Home.jsx             # Login page
│   ├── Register.jsx         # Sign up page
│   ├── Dashboard.jsx        # User dashboard
│   ├── SearchFlights.jsx    # Flight search form
│   ├── FlightResults.jsx    # Search results
│   ├── BookingPage.jsx      # Seat selection
│   ├── Profile.jsx          # User profile
│   ├── Navbar.jsx           # Navigation
│   └── Footer.jsx           # Footer
├── data/
│   └── flights.json         # Dummy flight data
├── App.js                   # Root router
└── App.css                  # Global styles
```

## 🛠️ Technology Stack

- **React 18.2.0** - UI library
- **React Router DOM 7.13.0** - Client-side routing
- **Framer Motion 10.16.4** - Advanced animations
- **lucide-react 0.263.1** - Icon library
- **CSS3** - Modern styling with custom properties

## 📱 Pages Included

| Page | URL | Auth | Description |
|------|-----|------|-------------|
| Landing | `/` | No | Welcome screen with hero section |
| Login | `/login` | No | User authentication |
| Register | `/register` | No | New user signup |
| Dashboard | `/dashboard` | Yes | User home page |
| Search Flights | `/search` | Yes | Flight search form |
| Flight Results | `/results` | No | Sortable flight listings |
| Booking | `/booking` | Yes | Interactive seat selection |
| Profile | `/profile` | Yes | User information |

## 🎨 Color Scheme

- **Primary**: #667eea (Purple)
- **Secondary**: #764ba2 (Dark Purple)
- **Accent**: #f093fb (Pink)
- **Success**: #48dbfb (Blue)
- **Danger**: #ff6b6b (Red)

## 📚 Documentation

For detailed information:
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide
- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Comprehensive docs
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design
- **[COLLEGE_PROJECT_REPORT.md](COLLEGE_PROJECT_REPORT.md)** - Full project report

## 🔄 Available Scripts

```bash
npm start              # Start dev server
npm test              # Run tests
npm run build         # Production build
npm run eject         # Eject from CRA (irreversible)
```

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop build/ folder to Netlify
```

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
PORT=3001 npm start
```

**Styles not loading?**
- Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
- Clear browser cache

**localStorage not working?**
- Check if in private/incognito mode
- Try clearing site data

## 📊 Project Statistics

- **Components**: 12
- **Pages**: 8
- **Animations**: 15+ CSS keyframes + Framer Motion
- **Lines of Code**: ~2,500
- **Responsive Breakpoints**: 3+

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Payment gateway (Stripe)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] PWA support

## 📝 License

MIT License - see LICENSE file for details

## 💬 Support

1. Check [QUICKSTART.md](QUICKSTART.md)
2. Review component code
3. Check browser DevTools
4. Refer to [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)

---

**Version**: 1.0.0  
**Status**: ✅ Complete & Production-Ready

Made with ❤️ for learning and sharing
- Font: Segoe UI with fallbacks

## Dependencies

- **react** (^18.2.0) - Main React library
- **react-dom** (^18.2.0) - React DOM rendering
- **react-router-dom** (^7.13.0) - Client-side routing
- **react-scripts** (5.0.1) - Build scripts and configuration

## Troubleshooting

### npm start not working
- Make sure you're in the project directory
- Delete `node_modules` folder and run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Port 3000 already in use
- The app will prompt you to use a different port
- Or manually specify: `PORT=3001 npm start`

### Blank page or errors
- Open browser console (F12) to check for errors
- Make sure all dependencies are installed: `npm install`
- Restart the development server

## Demo Usage

1. **Landing Page**: View the beautiful landing page with the quote
2. **Click "BOOK NOW"**: Navigate to the login page
3. **Login Page**: Enter any username and password and click "Login"
4. **Register Link**: Click "Register Here" to go to the registration page
5. **Registration**: Fill in all fields and click "Register"
6. **Navigate Back**: Use the "Login Here" link to return to login page

All form submissions show demo alerts (they don't actually save data).

## Future Enhancements

- Backend integration for data persistence
- User authentication with JWT
- Flight search and booking functionality
- Payment gateway integration
- Email verification
- User dashboard
- Booking history

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Support

For any issues or questions, please check the troubleshooting section or create an issue in the repository.

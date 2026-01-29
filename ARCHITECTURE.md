# System Architecture & Design Document

## 1. Application Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    React Flight Booking System               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Public Routes (No Auth)               │    │
│  ├────────────────────────────────────────────────────┤    │
│  │  • Landing.jsx (/)                                 │    │
│  │  • Home.jsx (/login)                               │    │
│  │  • Register.jsx (/register)                        │    │
│  │  • FlightResults.jsx (/results)                    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │          Protected Routes (Auth Required)          │    │
│  ├────────────────────────────────────────────────────┤    │
│  │  • Dashboard.jsx (/dashboard)                      │    │
│  │  • SearchFlights.jsx (/search)                     │    │
│  │  • BookingPage.jsx (/booking)                      │    │
│  │  • Profile.jsx (/profile)                          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Shared Components                          │    │
│  ├────────────────────────────────────────────────────┤    │
│  │  • Navbar.jsx (Navigation)                         │    │
│  │  • Footer.jsx (Footer)                             │    │
│  └────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Data & State Management                    │    │
│  ├────────────────────────────────────────────────────┤    │
│  │  • localStorage (User data, preferences)           │    │
│  │  • flights.json (Flight data)                      │    │
│  │  • React State Hooks (Component level)             │    │
│  └────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Component Hierarchy Tree

```
App.jsx (Root Component)
│
├── isDarkMode: boolean
├── selectedFlight: object
└── user: object
    │
    ├── Navbar.jsx
    │   ├── isOpen: boolean (mobile menu)
    │   └── Navigation Links
    │
    ├── Routes
    │   │
    │   ├── PUBLIC ROUTES
    │   │   ├── Landing.jsx
    │   │   │   ├── Plane Animation
    │   │   │   ├── Cloud Animation
    │   │   │   ├── Feature Cards
    │   │   │   └── CTA Buttons
    │   │   │
    │   │   ├── Home.jsx (Login)
    │   │   │   ├── username: state
    │   │   │   ├── password: state
    │   │   │   ├── showPassword: state
    │   │   │   └── Form Validation
    │   │   │
    │   │   ├── Register.jsx
    │   │   │   ├── formData: state
    │   │   │   ├── errors: state
    │   │   │   └── 4-Field Form
    │   │   │
    │   │   └── FlightResults.jsx
    │   │       ├── flights: array
    │   │       ├── sortBy: state
    │   │       └── Flight Cards
    │   │
    │   └── PROTECTED ROUTES
    │       ├── Dashboard.jsx
    │       │   ├── Welcome Card
    │       │   ├── Feature Grid (4 cards)
    │       │   └── Stats Display
    │       │
    │       ├── SearchFlights.jsx
    │       │   ├── searchData: state
    │       │   ├── Search Form
    │       │   └── Popular Routes
    │       │
    │       ├── BookingPage.jsx
    │       │   ├── selectedSeats: array
    │       │   ├── paymentMethod: state
    │       │   ├── Seat Grid (15×6)
    │       │   ├── Price Calculation
    │       │   └── Payment Options
    │       │
    │       └── Profile.jsx
    │           ├── Personal Info
    │           ├── Travel Stats
    │           ├── Benefits Display
    │           └── Account Actions
    │
    └── Footer.jsx
        ├── About Section
        ├── Quick Links
        ├── Contact Info
        └── Social Links
```

---

## 3. User Journey Flow Diagram

```
START (Browser Visit)
│
├─→ Landing Page (/)
│   ├─→ Already have account?
│   │   └─→ "BOOK NOW" → Login (/login)
│   │
│   └─→ New user?
│       └─→ "GET STARTED" → Register (/register)
│
├─→ Authentication
│   ├─→ LOGIN (Home.jsx)
│   │   ├─→ Enter credentials
│   │   ├─→ Form validation
│   │   ├─→ Save to localStorage
│   │   └─→ Redirect → Dashboard ✓
│   │
│   └─→ REGISTER (Register.jsx)
│       ├─→ Fill 4-field form
│       ├─→ Validate & check duplicates
│       ├─→ Save to localStorage
│       └─→ Redirect → Login
│
├─→ Dashboard (/dashboard) ✓ AUTHENTICATED
│   ├─→ View welcome message
│   ├─→ Click "Search Flights"
│   │   └─→ GO TO SEARCH
│   └─→ Click "Profile"
│       └─→ GO TO PROFILE
│
├─→ Search Flights (/search)
│   ├─→ Fill search form
│   ├─→ Click "SEARCH FLIGHTS"
│   │   └─→ GO TO RESULTS
│   └─→ OR click "Popular Route"
│
├─→ Flight Results (/results)
│   ├─→ View 8 flights
│   ├─→ Sort by: Price / Duration / Rating
│   ├─→ Click "SELECT" on flight
│   │   └─→ Store selected flight
│   │   └─→ GO TO BOOKING
│   └─→ (Can go back to search)
│
├─→ Booking Page (/booking)
│   ├─→ View flight summary
│   ├─→ Select seats (15×6 grid)
│   ├─→ Choose payment method
│   ├─→ Calculate total price
│   └─→ Click "COMPLETE BOOKING"
│       └─→ BOOKING CONFIRMED ✓
│
├─→ Profile (/profile)
│   ├─→ View personal information
│   ├─→ See travel statistics
│   ├─→ View membership benefits
│   └─→ Update preferences
│
└─→ Extra Features
    ├─→ Dark Mode Toggle (Navbar)
    ├─→ Logout (Navbar)
    └─→ Responsive Mobile Menu
```

---

## 4. Data Flow Diagram

### State Management Flow

```
┌──────────────────────┐
│   App.js             │
│ (Root State)         │
├──────────────────────┤
│ • isDarkMode         │
│ • selectedFlight     │
│ • user (from LS)     │
└──────┬───────────────┘
       │
       ├──→ Navbar.jsx
       │    • isDarkMode (passed)
       │    • onToggleDarkMode (callback)
       │
       ├──→ Dashboard.jsx
       │    • user (passed)
       │
       ├──→ SearchFlights.jsx
       │    • searchData (local state)
       │    • Passed to FlightResults
       │
       ├──→ FlightResults.jsx
       │    • flights (from flights.json)
       │    • sortedFlights (local state)
       │    • selectedFlight → sent to App
       │
       ├──→ BookingPage.jsx
       │    • flight (from App state)
       │    • selectedSeats (local state)
       │    • paymentMethod (local state)
       │
       ├──→ Profile.jsx
       │    • user (from localStorage)
       │
       └──→ Footer.jsx
            (No state needed)
```

### localStorage Structure

```javascript
{
  "isDarkMode": true/false,      // Dark mode preference
  "user": {
    "fullName": "John Doe",      // From registration
    "email": "john@example.com",
    "password": "123456",        // (Should be hashed in production)
    "phoneNumber": "555-0123",
    "username": "john@example.com"
  },
  "bookings": [                  // Future: Store booking history
    {
      "bookingId": "BK001",
      "flightId": "SW101",
      "seats": ["1A", "1B"],
      "totalPrice": 490,
      "date": "2024-01-20"
    }
  ]
}
```

---

## 5. Authentication Flow

```
User Entry
│
├─→ Landing Page (Public)
│   └─→ No auth check
│
├─→ Login Page (Public)
│   └─→ No auth check
│
├─→ Protected Routes Check
│   └─→ Dashboard
│       ├─→ localStorage.getItem('user') ?
│       ├─→ YES → Render component ✓
│       └─→ NO → Redirect to /login ✗
│
└─→ App.js Protection Logic
    if (!user && isProtectedRoute) {
      <Navigate to="/login" />
    }
```

---

## 6. Component Communication Patterns

### Pattern 1: Parent to Child (Props)
```jsx
// App.js (Parent)
<BookingPage flight={selectedFlight} />

// BookingPage.jsx (Child)
function BookingPage({ flight }) {
  return <div>{flight.airline}</div>
}
```

### Pattern 2: Child to Parent (Callbacks)
```jsx
// App.js (Parent)
const [isDarkMode, setIsDarkMode] = useState(false);
<Navbar onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

// Navbar.jsx (Child)
function Navbar({ onToggleDarkMode }) {
  return <button onClick={onToggleDarkMode}>Toggle</button>
}
```

### Pattern 3: localStorage Persistence
```jsx
// Register.jsx
const userData = { fullName, email, password, phoneNumber };
localStorage.setItem('user', JSON.stringify(userData));

// Profile.jsx
const user = JSON.parse(localStorage.getItem('user') || '{}');
```

### Pattern 4: Navigation with State
```jsx
// FlightResults.jsx
const navigate = useNavigate();
navigate('/booking', { state: { flight } });

// BookingPage.jsx
const { flight } = useLocation().state;
```

---

## 7. API Structure (for future backend integration)

### Proposed REST Endpoints

```
Authentication:
POST   /api/auth/register        → Register new user
POST   /api/auth/login           → Authenticate user
POST   /api/auth/logout          → Clear session
GET    /api/auth/me              → Get current user

Flights:
GET    /api/flights              → Get all flights
GET    /api/flights/search       → Search with filters
GET    /api/flights/:id          → Get flight details
GET    /api/flights/:id/seats    → Get seat availability

Bookings:
POST   /api/bookings             → Create new booking
GET    /api/bookings             → Get user bookings
GET    /api/bookings/:id         → Get booking details
PUT    /api/bookings/:id         → Update booking
DELETE /api/bookings/:id         → Cancel booking

Users:
GET    /api/users/:id            → Get user profile
PUT    /api/users/:id            → Update profile
DELETE /api/users/:id            → Delete account
```

### Proposed Database Schema

```
Users Table:
├── id (UUID)
├── fullName (string)
├── email (string, unique)
├── password (hashed)
├── phoneNumber (string)
├── membershipTier (enum: basic, premium, gold)
├── createdAt (timestamp)
└── updatedAt (timestamp)

Flights Table:
├── id (UUID)
├── airline (string)
├── flightNumber (string)
├── from (airport code)
├── to (airport code)
├── departureTime (datetime)
├── arrivalTime (datetime)
├── aircraft (string)
├── rating (decimal)
├── basePrice (decimal)
├── availableSeats (integer)
├── totalSeats (integer)
└── stops (integer)

Bookings Table:
├── id (UUID)
├── userId (foreign key)
├── flightId (foreign key)
├── seats (array of strings)
├── totalPrice (decimal)
├── paymentMethod (enum)
├── status (enum: pending, confirmed, cancelled)
├── bookingDate (timestamp)
└── departureDate (date)

Seats Table:
├── id (UUID)
├── flightId (foreign key)
├── seatNumber (string: 1A, 1B, etc)
├── isAvailable (boolean)
└── bookingId (foreign key, nullable)
```

---

## 8. Routing Structure

### Route Configuration (App.js)

```jsx
<BrowserRouter>
  <div className={isDarkMode ? 'dark-mode' : ''}>
    <Navbar isDarkMode={isDarkMode} onToggleDarkMode={...} />
    
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/results" element={<FlightResults />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/search" 
        element={user ? <SearchFlights /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/booking" 
        element={user ? <BookingPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/profile" 
        element={user ? <Profile /> : <Navigate to="/login" />} 
      />
    </Routes>
    
    <Footer />
  </div>
</BrowserRouter>
```

---

## 9. Styling Architecture

### CSS Variables System

```css
/* Light Mode (Default) */
:root {
  /* Colors */
  --primary: #667eea;
  --secondary: #764ba2;
  --accent: #f093fb;
  --success: #48dbfb;
  --danger: #ff6b6b;
  
  /* Typography */
  --text: #333;
  --text-secondary: #666;
  --bg: white;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Effects */
  --shadow: 0 10px 30px rgba(0,0,0,0.1);
  --blur: 10px;
  --radius: 15px;
  --transition: all 0.3s ease;
}

/* Dark Mode */
body.dark-mode {
  --text: #fff;
  --text-secondary: #ccc;
  --bg: #1a1a2e;
  --shadow: 0 10px 30px rgba(0,0,0,0.3);
}
```

### File Organization
```
src/
├── components/
│   ├── Landing.jsx
│   ├── Landing.css      ← Component-scoped styles
│   ├── Home.jsx
│   ├── Home.css
│   └── ...
├── App.js               ← Global router
├── App.css              ← Global styles & animations
└── index.css            ← Base styles
```

---

## 10. Animation System

### Framer Motion Variants Pattern

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

// Usage
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### CSS Keyframes Pattern

```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes planeFlying {
  0% { transform: translateX(-100px); }
  100% { transform: translateX(100px); }
}

.animated-element {
  animation: gradientShift 15s ease infinite;
}
```

---

## 11. Performance Optimization Strategy

### Current Optimizations
- ✅ Component-based code splitting
- ✅ localStorage caching
- ✅ CSS optimization
- ✅ SVG icons (lucide-react)

### Future Optimizations
- 🔄 React.lazy() for route-based code splitting
- 🔄 Image optimization & compression
- 🔄 Webpack bundle analysis
- 🔄 Service Worker & PWA
- 🔄 Memoization (React.memo, useMemo)

---

## 12. Error Handling Strategy

### Frontend Validation
```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateForm(data) {
  const errors = {};
  if (!data.email) errors.email = "Email required";
  if (!validateEmail(data.email)) errors.email = "Invalid email";
  return errors;
}
```

### Error Boundaries (Future)
```jsx
<ErrorBoundary>
  <BookingPage />
</ErrorBoundary>
```

---

## 13. Security Considerations

### Current Measures
- ✅ Client-side form validation
- ✅ localStorage usage (client-side only)
- ✅ No hardcoded secrets

### Production Recommendations
- 🔒 Implement HTTPS
- 🔒 Use secure HTTP-only cookies instead of localStorage
- 🔒 Add CSRF protection
- 🔒 Implement JWT tokens
- 🔒 Hash passwords server-side
- 🔒 Rate limiting on API endpoints
- 🔒 Input sanitization
- 🔒 Output encoding

---

## 14. Testing Strategy

### Unit Tests (Jest)
```javascript
describe('validateEmail', () => {
  it('should validate correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });
  
  it('should reject invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });
});
```

### Integration Tests (React Testing Library)
```javascript
describe('Login Component', () => {
  it('should submit form with valid data', () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText('Username'), 
      { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    // Assert redirect or success state
  });
});
```

---

This architecture document provides the complete system design for the Flight Booking System, making it easy to understand, maintain, and extend the application.

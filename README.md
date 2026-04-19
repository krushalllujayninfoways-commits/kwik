# MyApp — Full-Stack React + Node.js Starter

A production-ready full-stack application with:
- 🔐 JWT Authentication
- 📧 Email OTP Verification (Nodemailer)
- ⚛️ React 18 + Vite + Tailwind CSS
- 🛡️ Rate Limiting, bcrypt, Input Validation
- 📱 Fully Responsive Dark UI

---

## 📁 Project Structure

```
project/
├── frontend/                   # React + Vite + Tailwind
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # Root router
│       ├── index.css           # Global Tailwind styles
│       ├── context/
│       │   └── AuthContext.jsx # Global auth state (Context API)
│       ├── routes/
│       │   ├── ProtectedRoute.jsx
│       │   └── GuestRoute.jsx
│       ├── utils/
│       │   ├── api.js          # Axios instance with JWT interceptor
│       │   └── validators.js   # Reusable form validators
│       ├── components/
│       │   ├── common/
│       │   │   ├── Layout.jsx       # Navbar + Outlet + Footer
│       │   │   ├── AuthLayout.jsx   # Centered auth card layout
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── InputField.jsx   # Reusable input with error
│       │   │   └── Spinner.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── About.jsx
│           ├── Blog.jsx
│           ├── Contact.jsx
│           ├── PrivacyPolicy.jsx
│           ├── TermsOfService.jsx
│           ├── Register.jsx
│           ├── Login.jsx
│           ├── VerifyOtp.jsx
│           └── Dashboard.jsx   # Protected
│
└── backend/                    # Node.js + Express
    ├── server.js               # Entry point
    ├── package.json
    ├── .env.example
    ├── models/
    │   └── db.js               # In-memory store (swap for MongoDB)
    ├── routes/
    │   ├── auth.js             # Register / Login / OTP routes
    │   └── user.js             # Protected user routes
    ├── middleware/
    │   └── auth.js             # JWT verification middleware
    └── utils/
        ├── email.js            # Nodemailer + HTML template
        └── otp.js              # Crypto OTP generator
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm 9+
- A Gmail account (or any SMTP provider) for sending emails

---

### 1. Clone / Extract the project

```bash
cd /path/to/myapp-fullstack/project
```

---

### 2. Set up the Backend

```bash
cd backend
npm install
```

#### Create your `.env` file:

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
JWT_SECRET=replace_with_a_long_random_string_at_least_32_chars
JWT_EXPIRES_IN=7d

# Gmail SMTP (use App Password, not your real password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_16_char_app_password

FROM_EMAIL=your_gmail@gmail.com
FROM_NAME=MyApp
CONTACT_RECEIVER_EMAIL=your_gmail@gmail.com

OTP_EXPIRES_MINUTES=10
FRONTEND_URL=http://localhost:5173
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords → Generate one for "Mail".

> **Demo Mode:** If you leave `SMTP_USER` and `SMTP_PASS` empty, the app runs in **demo mode** — OTPs are printed to the terminal console instead of emailed. Perfect for local development without SMTP.

#### Start the backend:

```bash
# Development (auto-restarts on file change)
npm run dev

# Production
npm start
```

Backend runs at: **http://localhost:5000**

---

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

> The Vite dev server proxies `/api/*` to `http://localhost:5000` automatically — no CORS issues.

---

### 4. Open the App

Navigate to **http://localhost:5173** in your browser.

---

## 🔄 Full User Flow

```
1. Home page  →  Click "Get Started Free"
2. Register   →  Fill form (name, email, phone, city, position, password)
3. Server     →  Hashes password, saves user, generates OTP, emails it
4. Verify OTP →  Enter the 6-digit code from email (or check terminal in demo mode)
5. Login      →  Email + password → receive JWT
6. Dashboard  →  Protected page showing profile info and account status
```

---

## 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/verify-otp` | No | Verify email OTP |
| POST | `/api/auth/resend-otp` | No | Resend OTP email |
| POST | `/api/auth/login` | No | Login, receive JWT |
| POST | `/api/contact` | No | Submit the contact form |
| GET | `/api/user/profile` | JWT | Get current user |
| GET | `/api/user/dashboard` | JWT | Dashboard data |
| GET | `/api/health` | No | Server health check |

---

## 🔒 Security Features

| Feature | Implementation |
|---------|---------------|
| Password hashing | bcrypt with 12 salt rounds |
| Token auth | JWT with configurable expiry |
| OTP security | Crypto random, 10-min expiry, 5-attempt lockout |
| Rate limiting | 20 req / 15 min on auth endpoints |
| Input validation | express-validator on all inputs |
| CORS | Restricted to frontend origin only |

---

## 🚀 Production Deployment

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
```

Set `VITE_API_URL=https://your-backend.com/api` in your frontend hosting provider.

### Backend (Railway / Render / Fly.io)

```bash
cd backend
# Set all .env variables in your hosting dashboard
npm start
```

### Separate Render Deployment

This repo is ready for two separate Render deployments:

- Backend service
  - Root Directory: `project/backend`
  - Build Command: `npm install`
  - Start Command: `npm start`

- Frontend static site
  - Root Directory: `project/frontend`
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`

The root `render.yaml` also includes both services if you want to deploy with a Render Blueprint.

Backend environment variables:

```env
NODE_ENV=production
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com
FROM_NAME=MyApp Team
CONTACT_RECEIVER_EMAIL=your_email@gmail.com
OTP_EXPIRES_MINUTES=10
FRONTEND_URL=https://your-frontend-name.onrender.com
```

Frontend environment variables:

```env
VITE_API_URL=https://your-backend-name.onrender.com/api
```

### Replace In-Memory DB with MongoDB

Install Mongoose:
```bash
npm install mongoose
```

Replace `models/db.js` with a Mongoose schema, and update routes to use async Mongoose calls. The rest of the code stays the same.

---

## 📦 Key Dependencies

### Frontend
| Package | Purpose |
|---------|---------|
| react 18 | UI framework |
| react-router-dom 6 | Client-side routing |
| axios | HTTP requests + interceptors |
| react-hot-toast | Toast notifications |
| tailwindcss | Utility-first CSS |

### Backend
| Package | Purpose |
|---------|---------|
| express | Web framework |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT creation & verification |
| nodemailer | Email sending |
| express-validator | Input validation |
| express-rate-limit | Brute-force protection |

---

## 🛠️ Common Issues

**OTP not received?**
- Check terminal — if SMTP is not configured, OTP prints there
- Verify Gmail App Password (not your real Gmail password)
- Check spam folder

**CORS error?**
- Ensure backend is running on port 5000
- Ensure `FRONTEND_URL` in `.env` matches your dev URL

**JWT errors?**
- Make sure `JWT_SECRET` is set and hasn't changed between sessions

**Port already in use?**
- Change `PORT` in backend `.env`
- Change `port` in `vite.config.js`

---

## 📄 License

MIT — free to use, modify, and distribute.

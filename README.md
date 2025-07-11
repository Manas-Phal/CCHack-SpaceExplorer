# 🌌 Space Explorer+

**A visually stunning, interactive space exploration platform** inspired by NASA and modern astronomy apps like SkyView and Star Walk. Space Explorer+ brings the cosmos to your fingertips with an immersive dark theme, animated starfield, interactive celestial data, 3D solar system, and real-time observation tracking.

![Space Explorer+ Preview](https://your-image-link-here.com) 

---
# 🌌 Project Overview
Space Explorer+ is an immersive space exploration web app designed to bring the beauty and wonder of the cosmos to users through a modern, interactive, and educational experience. Whether you're an astronomy enthusiast or a curious learner, this app gives you an engaging platform to explore celestial objects, track sky events, and even log your own observations — all within a sleek, animated cosmic UI.

This project combines cutting-edge web technologies, data visualization, and aesthetic design principles inspired by real-world space apps like SkyView and NASA’s digital platforms.

## 👨‍🚀 What Can You Do With Space Explorer+?
- Explore celestial objects in an interactive database with filtering
- View real-time sky events and countdowns to cosmic phenomena
- Track your own observations using forms synced to Firestore
- Visualize your astronomy journey through charts and achievement badges
- Login securely using Firebase (Google/Email)
- Fly through a 3D star map powered by Three.js
- Enjoy beautiful UI/UX design with smooth animations and cosmic styling

## 🧑‍🎓 Who Is This For?
This project is perfect for:

- Space & astronomy lovers
- UI/UX designers looking for creative inspiration
- React/Firebase developers exploring animation and interaction
- Students building portfolios or learning full-stack development
- Anyone who enjoys a beautifully built themed web experience

## 💡 Inspiration
The aesthetic is inspired by:
NASA's visual identity
Mobile apps like SkyView, Star Walk, and Stellarium
Design trends like glassmorphism, dark mode, glowing effects, and cosmic gradients



## 🚀 Features

### 🌠 Cosmic Design & Animations
- Modern dark UI with **glassmorphism**, **deep-space gradients**, and glowing elements
- Animated **starfield background**, **floating elements**, and **shooting stars**
- Staggered fade-in effects, hover interactions, smooth transitions

### 🪐 Celestial Exploration
- Hero section with compelling CTA
- Interactive **celestial object database** with filters
- 3D **solar system viewer** built with Three.js & React Three Fiber
- Sky Tonight modal: Geolocation-based sky view with fallback data

### 🔭 Observation Tools
- **Observation tracker** with real-time Firestore integration
- Data visualizations: Charts, progress bars, and achievement badges
- Countdown timers for upcoming sky events

### 👩‍🚀 Gamified Profiles
- User dashboard with levels, badges, and stats
- Image upload via drag & drop
- Firebase Auth: Google & Email login
- Protected routes & auth-based content

### 📱 Mobile-First Design
- Responsive UI for all screen sizes
- Optimized for touch gestures
- Skeleton loaders and toast notifications

---


## 🛠 Tech Stack

| Frontend     | Backend / Services         | Other |
|--------------|----------------------------|-------|
| React        | Firebase Auth & Firestore  | HSL Theming |
| Tailwind CSS | Geolocation API            | Toastify |
| Three.js     | React Three Fiber          | Skeleton UI |
| Framer Motion |                            | Chart.js |

---

## Project Structure
space-explorer/
├── public/                       # Static files served directly
│   ├── index.html                # Main HTML file
│   ├── favicon.ico               # Browser tab icon
│   └── manifest.json             # PWA configuration
│
├── src/                          # Source files
│   ├── assets/                   # Static assets (images, icons, etc.)
│   │   └── logo.svg
│
│   ├── components/               # Reusable UI components
│   │   ├── CelestialCard.jsx
│   │   ├── SkyTonightModal.jsx
│   │   ├── ObservationForm.jsx
│   │   └── Navbar.jsx
│
│   ├── pages/                    # Top-level views/pages
│   │   ├── Explore.jsx
│   │   ├── Track.jsx
│   │   ├── Profile.jsx
│   │   └── Home.jsx
│
│   ├── context/                  # App context (e.g., Auth provider)
│   │   └── AuthContext.jsx
│
│   ├── services/                 # External services and APIs
│   │   ├── firebase.js           # Firebase configuration
│   │   ├── astronomyAPI.js       # Astronomy data integration (NASA, etc.)
│   │   └── uploadImage.js        # Image upload handler
│
│   ├── styles/                   # Global and utility styles
│   │   └── global.css
│
│   ├── App.jsx                   # Main app component with routes
│   ├── main.jsx                  # Entry point for ReactDOM rendering
│   └── router.jsx                # Route definitions
│
├── .env                          # Environment variables (e.g., API keys)
├── .gitignore                    # Git ignored files
├── package.json                  # Project metadata and dependencies
└── README.md                     # Project documentation


## 🔧 Installation

### Prerequisites:
- Node.js & npm/yarn
- Firebase project (get your config from Firebase Console)

``bash
git clone https://github.com/Manas-Phal/space-explorer2.git
cd space-explorer2
npm install



## Create a .env file in the root directory:
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

### Then run the development server:
npm start

## 📸 Screenshots
🚀 3D Solar System Viewer
📊 Observation Stats Dashboard
🌌 Hero Section with CTA
🎨 Responsive Mobile UI

## 📦 Deployment
- Fully responsive and production-ready
- Firebase config support
- Fallback data ensures offline functionality
- Toasts and error handlers in place

## 🤝 Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change or improve.

## 📄 License
MIT

## 🌟 Acknowledgements
- NASA API & Space Assets
- Three.js / React Three Fiber
- Framer Motion & Tailwind CSS
- Firebase by Google



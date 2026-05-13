// Central place for the backend base URL.
// In dev:  reads from .env  → http://localhost:4000
// In prod: reads from .env.production → your deployed backend URL
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? 'https://blog-platform-production-7909.up.railway.app' : 'http://localhost:5000');

export default API_BASE

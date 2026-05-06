/* =====================================================
   DSA Tracker — Express Server
   Serves frontend + API routes
   ===================================================== */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Connect to MongoDB ─────────────────────────────
connectDB();

// ─── Middleware ──────────────────────────────────────
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ─────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// ─── Serve Frontend Static Files ────────────────────
// In production, serve the Vite build output from frontend/dist
// In development, use Vite dev server with proxy (port 5173)
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendPath));

// ─── Catch-all: serve index.html for any non-API route (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// ─── Global Error Handler ───────────────────────────
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
});

// ─── Start Server ───────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n⚡ DSA Tracker Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving frontend from: ${path.join(__dirname, '..', 'frontend')}`);
    console.log(`🔌 API available at: http://localhost:${PORT}/api/auth\n`);
});

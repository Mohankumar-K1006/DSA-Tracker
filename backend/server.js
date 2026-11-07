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
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsers (Crucial for reading incoming frontend form data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ─────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// ─── Serve Frontend Static Files ────────────────────
// Only serve frontend if the dist directory exists (not on Render)
const fs = require('fs');
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    // API-only mode (Render deployment — frontend is on Vercel)
    app.get('/', (req, res) => {
        res.json({ status: 'ok', message: 'DSA Tracker API is running 🚀' });
    });
}

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
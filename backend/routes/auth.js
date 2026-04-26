/* =====================================================
   DSA Tracker — Auth Routes
   POST /api/auth/register
   POST /api/auth/login
   GET  /api/auth/me
   ===================================================== */

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
}

// Format user response (strip sensitive fields)
function formatUser(user) {
    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        avatarColor: user.avatarColor,
        createdAt: user.createdAt,
    };
}

// ─── REGISTER ────────────────────────────────────────
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validation
        if (!fullName || fullName.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Full name must be at least 2 characters',
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required',
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters',
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }

        // Create user
        const user = await User.create({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            password,
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: formatUser(user),
        });
    } catch (error) {
        console.error('Register error:', error);

        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: messages[0],
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error — please try again later',
        });
    }
});

// ─── LOGIN ───────────────────────────────────────────
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // Find user with password field included
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: formatUser(user),
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error — please try again later',
        });
    }
});

// ─── GET CURRENT USER ────────────────────────────────
router.get('/me', protect, async (req, res) => {
    try {
        res.json({
            success: true,
            user: formatUser(req.user),
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

module.exports = router;

/* =====================================================
   DSA Tracker — User Model (Mongoose Schema)
   ===================================================== */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name must be less than 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false, // Don't include password in queries by default
    },
    avatar: {
        type: String,
        default: '',
    },
    avatarColor: {
        type: String,
        default: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate initials from full name
userSchema.pre('save', function (next) {
    if (this.isModified('fullName') || !this.avatar) {
        this.avatar = this.fullName
            .split(' ')
            .map(w => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }
    next();
});

// Generate random avatar color on creation
userSchema.pre('save', function (next) {
    if (this.isNew && !this.avatarColor) {
        const colors = [
            'linear-gradient(135deg, #6366f1, #8b5cf6)',
            'linear-gradient(135deg, #06b6d4, #0891b2)',
            'linear-gradient(135deg, #22c55e, #16a34a)',
            'linear-gradient(135deg, #f59e0b, #d97706)',
            'linear-gradient(135deg, #ef4444, #dc2626)',
            'linear-gradient(135deg, #ec4899, #be185d)',
            'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            'linear-gradient(135deg, #14b8a6, #0d9488)',
        ];
        this.avatarColor = colors[Math.floor(Math.random() * colors.length)];
    }
    next();
});

module.exports = mongoose.model('User', userSchema);

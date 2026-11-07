/* =====================================================
   DSA Tracker — Database Connection
   Uses Mongoose to connect to MongoDB
   ===================================================== */

const mongoose = require('mongoose');

const connectDB = async () => {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000; // 5 seconds

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 10000, // 10s timeout
            });
            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
            return; // Success — exit the function
        } catch (error) {
            console.error(`❌ MongoDB Connection Attempt ${attempt}/${MAX_RETRIES}: ${error.message}`);
            if (attempt < MAX_RETRIES) {
                console.log(`⏳ Retrying in ${RETRY_DELAY / 1000}s...`);
                await new Promise(r => setTimeout(r, RETRY_DELAY));
            } else {
                console.error('💀 All MongoDB connection attempts failed. Exiting.');
                process.exit(1);
            }
        }
    }
};

module.exports = connectDB;

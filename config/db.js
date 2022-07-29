const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    mongoose.Promise = global.Promise;
    if (!MONGODB_URI) {
        throw new Error('No MongoDB URI');
    }
    const conn = await mongoose.connect(MONGODB_URI)
}

module.exports = connectDB;
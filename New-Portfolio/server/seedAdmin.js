require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');

    // Get credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log('Admin password updated successfully!');
    } else {
      // Create new admin user
      const admin = new Admin({
        email: adminEmail,
        password: adminPassword
      });

      await admin.save();
      console.log('Admin user created successfully!');
    }

    console.log('\nAdmin Details:');
    console.log('Email:', adminEmail);
    console.log('Password: (hashed in database)');

    // Disconnect
    await mongoose.disconnect();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();

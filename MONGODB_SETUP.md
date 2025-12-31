# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas and connect your portfolio to the database.

## 🚀 Quick Start

### 1. Get Your MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a free account
3. Create a new project (if you don't have one)
4. Click "Build a Database" → Choose "M0 Free" tier
5. Choose your cloud provider and region (closest to you for best performance)
6. Click "Create"
7. Set up database access:
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set a username and strong password (save these!)
   - Set user privileges to "Atlas admin"
   - Click "Add User"
8. Set up network access:
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add your specific IP)
   - Click "Confirm"
9. Get your connection string:
   - Go back to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/`)

### 2. Configure Your Environment

1. Open the `.env` file in your project root
2. Replace `your_mongodb_atlas_connection_string_here` with your connection string
3. **IMPORTANT**: Replace `<password>` in the connection string with your actual database user password
4. Add your database name at the end of the connection string

Example:
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

Your complete `.env` file should look like this:
```
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# Server Port
PORT=5000

# Admin Credentials (for authentication)
ADMIN_EMAIL=admin@simzik.com
ADMIN_PASSWORD=admin123
```

### 3. Start Your Application

Run the following command to start both the frontend and backend servers:

```bash
npm run dev
```

This will start:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:5000

## 📋 What's Been Set Up

### Backend Structure
```
server/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── Project.js          # Project schema
│   ├── Skill.js            # Skill schema
│   └── Testimonial.js      # Testimonial schema
├── routes/
│   ├── projects.js         # Project CRUD routes
│   ├── skills.js           # Skills CRUD routes
│   └── testimonials.js     # Testimonials CRUD routes
└── server.js               # Main server file
```

### API Endpoints

#### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

#### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

## 🎯 How to Use the Admin Panel

1. Start your application: `npm run dev`
2. Open http://localhost:5173
3. Scroll to the footer and click the small dot (•) next to the copyright
4. Login with:
   - Email: `admin@simzik.com`
   - Password: `admin123`
5. You can now:
   - Add, edit, and delete projects
   - Manage your skills
   - Handle testimonials

All changes will be saved directly to MongoDB Atlas!

## 🔧 Database Schema

### Project Model
```javascript
{
  title: String,           // Project name
  description: String,     // Project description
  image: String,          // Image URL
  technologies: [String], // Array of tech used
  category: String,       // web, mobile, design, other
  liveUrl: String,        // Live demo URL
  githubUrl: String,      // GitHub repo URL
  featured: Boolean,      // Show as featured?
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Skill Model
```javascript
{
  name: String,           // Skill name
  category: String,       // frontend, backend, tools
  level: String,          // Beginner, Intermediate, Advanced, Expert
  percentage: Number,     // 0-100
  experience: String,     // e.g., "2+ years"
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Testimonial Model
```javascript
{
  name: String,           // Client name
  role: String,           // Client role/company
  content: String,        // Testimonial text
  rating: Number,         // 1-5 stars
  avatar: String,         // Avatar URL (optional)
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## 🐛 Troubleshooting

### Server won't start
- Make sure MongoDB connection string is correct in `.env`
- Check that you replaced `<password>` with your actual password
- Verify your IP is whitelisted in MongoDB Atlas Network Access

### Can't connect to database
- Check MongoDB Atlas is running
- Verify your connection string
- Make sure your database user has correct permissions

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check console for CORS errors
- Verify API_BASE_URL in `src/services/api.js` matches your backend port

## 🔐 Security Notes

1. **Never commit your `.env` file** - It's already in `.gitignore`
2. Change the default admin credentials in production
3. Use strong passwords for your MongoDB users
4. Restrict IP access in MongoDB Atlas for production

## 📦 Packages Installed

- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `cors` - Enable CORS
- `dotenv` - Environment variables
- `nodemon` - Auto-restart server on changes
- `concurrently` - Run multiple commands

## ✅ Next Steps

1. Add your MongoDB Atlas connection string to `.env`
2. Run `npm run dev` to start the application
3. Login to the admin panel
4. Start adding your projects, skills, and testimonials!

The portfolio components will automatically fetch and display data from MongoDB Atlas.

---

Need help? Check the [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

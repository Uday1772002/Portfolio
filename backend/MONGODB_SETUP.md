# MongoDB Setup Guide for Portfolio Backend

This guide will help you set up MongoDB and connect it to your portfolio backend.

## 🗄️ MongoDB Installation Options

### Option 1: Local MongoDB Installation (Recommended for Development)

#### macOS (using Homebrew)
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh --eval "db.runCommand('ping')"
```

#### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Start MongoDB service from Windows Services

#### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod
```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Set up database access (username/password)
5. Set up network access (IP whitelist)
6. Get your connection string

## 🔧 Environment Configuration

### 1. Create Environment File
```bash
cd backend
cp env.example .env
```

### 2. Configure MongoDB Connection

#### For Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

#### For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 3. Complete Environment File
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Security
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=http://localhost:8080
```

## 🚀 Starting the Backend

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start MongoDB (if using local installation)
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start from Services or use MongoDB Compass
```

### 3. Seed the Database (Optional but Recommended)
```bash
npm run seed
```

This will populate your database with sample projects and experience data.

### 4. Start the Backend Server
```bash
npm run dev
```

## 🔍 Verifying the Setup

### 1. Check MongoDB Connection
Visit: `http://localhost:5001/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Portfolio Backend is running",
  "database": "Connected",
  "timestamp": "2024-08-15T...",
  "uptime": 123.456
}
```

### 2. Check API Endpoints
- **Root**: `http://localhost:5001/`
- **Health**: `http://localhost:5001/api/health`
- **Projects**: `http://localhost:5001/api/projects`
- **Experience**: `http://localhost:5001/api/experience`
- **Contact**: `http://localhost:5001/api/contact`

### 3. Test Database Operations
```bash
# Get all projects
curl http://localhost:5001/api/projects

# Get all experience
curl http://localhost:5001/api/experience

# Get contact info
curl http://localhost:5001/api/contact
```

## 🗃️ Database Structure

### Collections Created:

#### 1. **contacts**
- Contact form submissions
- Email notifications
- Status tracking

#### 2. **projects**
- Portfolio projects
- Technologies used
- Metrics and achievements

#### 3. **experiences**
- Work experience
- Company details
- Achievements and impact

## 🛠️ MongoDB Management

### Using MongoDB Compass (GUI)
1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `portfolio` database
4. View and manage collections

### Using MongoDB Shell (CLI)
```bash
# Connect to MongoDB
mongosh

# Switch to portfolio database
use portfolio

# Show collections
show collections

# Query data
db.projects.find()
db.experiences.find()
db.contacts.find()

# Exit
exit
```

## 🔒 Security Considerations

### 1. Local Development
- MongoDB runs on localhost only
- No authentication required (development only)

### 2. Production (MongoDB Atlas)
- Use strong passwords
- Enable IP whitelisting
- Use connection string with authentication
- Enable SSL/TLS

### 3. Environment Variables
- Never commit `.env` files
- Use strong JWT secrets
- Rotate credentials regularly

## 🚨 Troubleshooting

### Common Issues:

#### 1. **Connection Refused**
```bash
# Check if MongoDB is running
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux
```

#### 2. **Authentication Failed**
- Verify username/password in connection string
- Check IP whitelist in Atlas
- Ensure database user has correct permissions

#### 3. **Port Already in Use**
```bash
# Change port in .env file
PORT=5002

# Or kill existing process
lsof -ti:5001 | xargs kill -9
```

#### 4. **Database Not Found**
- The database will be created automatically when you first insert data
- Run `npm run seed` to populate initial data

## 📊 Database Monitoring

### 1. Check Database Status
```bash
# In MongoDB shell
db.stats()
db.projects.stats()
db.experiences.stats()
db.contacts.stats()
```

### 2. Monitor Performance
```bash
# Check slow queries
db.getProfilingStatus()
db.setProfilingLevel(2)
```

### 3. Backup and Restore
```bash
# Backup
mongodump --db portfolio --out ./backup

# Restore
mongorestore --db portfolio ./backup/portfolio
```

## 🔮 Next Steps

1. **Customize Data**: Update seed data with your actual projects and experience
2. **Add Authentication**: Implement user authentication for admin panel
3. **File Uploads**: Add image upload functionality for projects
4. **Analytics**: Track portfolio views and interactions
5. **Caching**: Implement Redis for better performance
6. **Testing**: Add unit and integration tests

## 📞 Support

If you encounter issues:
1. Check MongoDB logs
2. Verify connection string
3. Ensure MongoDB service is running
4. Check firewall settings
5. Review error messages in console

---

**Happy Coding! 🚀**

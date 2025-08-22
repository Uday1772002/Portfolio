# Portfolio Backend API

Backend API server for Jayaram Uday Marali's portfolio website built with Node.js, Express, and modern web technologies.

## 🚀 Features

- **Contact Form Handling** - Process contact form submissions with email notifications
- **Project Management** - Serve and manage portfolio projects with filtering
- **Experience Management** - Handle work experience data with detailed analytics
- **Email Integration** - Automated email responses and notifications
- **RESTful API** - Clean, well-structured API endpoints
- **Security** - Helmet.js security headers and input validation
- **Logging** - Morgan HTTP request logging
- **CORS Support** - Cross-origin resource sharing enabled

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Email**: Nodemailer
- **Security**: Helmet.js
- **Logging**: Morgan
- **CORS**: Express CORS middleware
- **Environment**: Dotenv

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Gmail account (for email functionality)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment example file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your actual values:

```env
PORT=5000
NODE_ENV=development
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Note**: For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password instead of your regular password

### 3. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 4. Production Build

```bash
npm start
```

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact information

### Projects
- `GET /api/projects` - Get all projects (with optional filtering)
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects/categories` - Get all project categories
- `GET /api/projects/technologies` - Get all technologies used

### Experience
- `GET /api/experience` - Get all work experiences (with optional filtering)
- `GET /api/experience/:id` - Get experience by ID
- `GET /api/experience/companies` - Get all companies
- `GET /api/experience/technologies` - Get all technologies used
- `GET /api/experience/summary` - Get experience summary and analytics

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `EMAIL_USER` | Gmail username | Required |
| `EMAIL_PASS` | Gmail app password | Required |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

### Email Configuration

The backend uses Gmail SMTP for sending emails. You'll need to:

1. **Enable 2FA** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Use the App Password** in your `.env` file

## 📁 Project Structure

```
backend/
├── routes/           # API route handlers
│   ├── contact.js    # Contact form endpoints
│   ├── projects.js   # Project management endpoints
│   └── experience.js # Experience management endpoints
├── server.js         # Main server file
├── package.json      # Dependencies and scripts
├── env.example       # Environment variables template
└── README.md         # This file
```

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Adding New Routes

1. Create a new route file in `routes/` directory
2. Export the router
3. Import and use in `server.js`

Example:
```javascript
// routes/new-feature.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'New feature endpoint' });
});

module.exports = router;

// server.js
app.use('/api/new-feature', require('./routes/new-feature'));
```

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Input Validation** - Request data validation
- **CORS Protection** - Controlled cross-origin access
- **Rate Limiting** - (Can be added with express-rate-limit)
- **Request Size Limits** - 10MB max request size

## 📧 Email Features

- **Contact Form Processing** - Handle form submissions
- **Auto-reply** - Send confirmation emails to users
- **Admin Notifications** - Email notifications for new contacts
- **HTML Templates** - Professional email formatting

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication and authorization
- [ ] Admin panel for content management
- [ ] File upload handling
- [ ] Analytics and tracking
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Testing suite
- [ ] Docker containerization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For questions or support, contact:
- **Email**: jayaramuday17@gmail.com
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [Your GitHub Profile]

---

Built with ❤️ by Jayaram Uday Marali

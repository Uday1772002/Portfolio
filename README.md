# Jayaram Uday Marali - Portfolio Website

A modern, responsive portfolio website with a full-stack architecture showcasing my skills, projects, and experience as a Software Engineer and GCP Certified Associate Cloud Engineer.

## 🏗️ Architecture

This project consists of two main parts:

### Frontend (Portfolio Website)

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Responsive design** for all devices
- **Dark/Light theme** toggle

### Backend (API Server)

- **Node.js** with Express
- **RESTful API** endpoints
- **Email integration** for contact forms
- **Data management** for projects and experience
- **Security features** with Helmet.js

## 🚀 Quick Start

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will be available at `http://localhost:8080`

### Backend Development

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your email credentials
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

## 📱 Frontend Features

- **Hero Section** - Introduction and contact information
- **About Section** - Skills, experience, and background
- **Experience Section** - Detailed work history with achievements
- **Education Section** - Academic background and certifications
- **Projects Section** - Featured projects and achievements
- **Contact Section** - Contact form and information
- **Responsive Design** - Optimized for all devices
- **Theme Toggle** - Dark/Light mode switching
- **Smooth Animations** - Engaging user experience

## 🔧 Backend Features

- **Contact Form API** - Handle form submissions with email notifications
- **Projects API** - Serve project data with filtering capabilities
- **Experience API** - Manage work experience with analytics
- **Email Integration** - Automated responses and notifications
- **Security** - Helmet.js security headers and validation
- **Logging** - HTTP request logging with Morgan
- **CORS Support** - Cross-origin resource sharing

## 🛠️ Tech Stack

### Frontend

- React 18, TypeScript, Tailwind CSS
- shadcn/ui components, Lucide React icons
- Vite build tool, React Router DOM

### Backend

- Node.js, Express.js, Nodemailer
- Helmet.js security, Morgan logging
- CORS middleware, Environment configuration

## 📚 API Endpoints

### Health Check

- `GET /api/health` - Server status

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact info

### Projects

- `GET /api/projects` - All projects (with filtering)
- `GET /api/projects/:id` - Project by ID
- `GET /api/projects/categories` - Project categories
- `GET /api/projects/technologies` - Technologies used

### Experience

- `GET /api/experience` - All experiences (with filtering)
- `GET /api/experience/:id` - Experience by ID
- `GET /api/experience/summary` - Experience analytics

## 🔧 Configuration

### Frontend

- Update personal information in component files
- Modify colors in `tailwind.config.ts`
- Add new sections as needed

### Backend

- Copy `backend/env.example` to `backend/.env`
- Configure Gmail credentials for email functionality
- Set port and environment variables

## 📁 Project Structure

```
my-pic-perso/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── portfolio/      # Portfolio-specific components
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   └── lib/               # Utility functions
├── backend/                # Backend API server
│   ├── routes/            # API route handlers
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── public/                 # Static assets
├── package.json            # Frontend dependencies
└── README.md               # This file
```

## 🚀 Deployment

### Frontend

- Build with `npm run build`
- Deploy to Vercel, Netlify, or any static hosting
- Update backend API URL in production

### Backend

- Set production environment variables
- Deploy to Heroku, Railway, or any Node.js hosting
- Configure CORS for production domain

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Admin panel for content management
- [ ] Blog section with CMS
- [ ] Analytics and visitor tracking
- [ ] File upload for project images
- [ ] Authentication system
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 📞 Contact

- **Email**: jayaramuday17@gmail.com
- **Phone**: +91 6302595694
- **Location**: Delhi, India

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React, Node.js & Tailwind CSS

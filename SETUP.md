# Portfolio Project Setup Guide

## Overview

This is a full-stack portfolio website with a React frontend and Node.js/Express backend.

## Project Structure

```
my-pic-perso/
├── backend/          # Node.js/Express API server
├── src/              # React frontend source code
├── start-dev.sh      # Development startup script
└── SETUP.md          # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## Quick Start

### Option 1: Using the startup script (Recommended)

```bash
./start-dev.sh
```

### Option 2: Manual startup

#### 1. Start Backend Server

```bash
cd backend
npm install
npm run dev
```

Backend will run on http://localhost:5001

#### 2. Start Frontend Server

```bash
npm install
npm run dev
```

Frontend will run on http://localhost:8080

## Backend Setup

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5001
```

### Database Setup

1. Ensure MongoDB is running
2. Run the seed script to populate initial data:

```bash
cd backend
npm run seed
```

### API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/experience` - Get work experience

## Frontend Features

### Components

- **Header**: Navigation with backend health indicator
- **Hero**: Introduction section
- **About**: Personal information
- **Experience**: Work history (fetched from API)
- **Projects**: Portfolio projects (fetched from API)
- **Contact**: Contact form (submits to backend)
- **Footer**: Additional links

### State Management

- React Query for API data fetching
- Local state for form handling
- Toast notifications for user feedback

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Key Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS with custom design system

## Troubleshooting

### Backend Connection Issues

1. Check if MongoDB is running
2. Verify backend server is on port 5001
3. Check browser console for CORS errors
4. Ensure `.env` file exists with correct MongoDB URI

### Frontend Issues

1. Verify backend is running before starting frontend
2. Check browser console for API errors
3. Ensure all dependencies are installed

### Common Issues

- **Port conflicts**: Change ports in `vite.config.ts` or `backend/server.js`
- **CORS errors**: Backend has CORS enabled, but check browser console
- **Database connection**: Ensure MongoDB is accessible

## Production Deployment

### Backend

1. Set production environment variables
2. Use PM2 or similar process manager
3. Configure reverse proxy (nginx)

### Frontend

1. Build with `npm run build`
2. Serve static files from web server
3. Configure API base URL for production

## API Documentation

### Contact Form

```typescript
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}
```

### Project

```typescript
interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  technologies: string[];
  featured: boolean;
  likes: number;
}
```

### Experience

```typescript
interface Experience {
  _id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  achievements: string[];
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
}
```

## Support

For issues or questions, check the console logs and ensure both servers are running properly.

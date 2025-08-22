#!/bin/bash

echo "🚀 Starting Portfolio Development Environment..."

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down development servers..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start backend server
echo "🔧 Starting backend server on port 5001..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server on port 8080..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Development servers started!"
echo "📍 Backend: http://localhost:5001"
echo "🌐 Frontend: http://localhost:8080"
echo "📊 Health Check: http://localhost:5001/api/health"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait

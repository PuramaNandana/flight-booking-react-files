#!/bin/bash
# Quick Start Script for Flight Booking System

echo "=========================================="
echo "Flight Booking System - Quick Start"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    echo "Current directory: $(pwd)"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 Starting development server..."
    echo "The app will open at: http://localhost:3000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    npm start
else
    echo "❌ Installation failed. Please try again."
    exit 1
fi

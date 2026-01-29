@echo off
REM Flight Booking System - Quick Start Script for Windows

echo ==========================================
echo Flight Booking System - Quick Start
echo ==========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

REM Get versions
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo [OK] Node.js found: %NODE_VERSION%
echo [OK] npm found: %NPM_VERSION%
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo X Please run this script from the project root directory
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo [*] Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo X Installation failed. Please try again.
    pause
    exit /b 1
)

echo.
echo [OK] Installation complete!
echo.
echo [*] Starting development server...
echo The app will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
pause
call npm start

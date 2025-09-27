@echo off
echo 🚀 TheNZT Setup Script
echo =====================
echo.

REM Check if Node.js is installed
echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo.
    echo Please download and install Node.js from: https://nodejs.org/
    echo 1. Go to https://nodejs.org/
    echo 2. Download the LTS version (recommended)
    echo 3. Run the installer and follow the setup wizard
    echo 4. Make sure to check 'Add to PATH' during installation
    echo 5. Restart your terminal after installation
    echo.
    echo After installing Node.js, run this script again.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Check if npm is available
echo Checking for npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available
    echo Please reinstall Node.js with npm included
    pause
    exit /b 1
)

echo ✅ npm is available
echo.

echo Installing frontend dependencies...
echo This may take a few minutes...

REM Navigate to frontend directory
cd src\frontend

REM Install dependencies
echo Running: npm install --legacy-peer-deps
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    echo Try running: npm cache clean --force
    echo Then run this script again
    pause
    exit /b 1
)

echo.
echo 🎉 Setup Complete!
echo =================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo The website will be available at: http://localhost:3000
echo.
echo Press any key to start the development server now...
pause >nul

echo Starting development server...
npm run dev

# TheNZT Setup Script for Windows
# This script will help you download and install all required dependencies

Write-Host "🚀 TheNZT Setup Script" -ForegroundColor Green
Write-Host "=====================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js is already installed: $nodeVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download and install Node.js from: https://nodejs.org/" -ForegroundColor Cyan
    Write-Host "1. Go to https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Download the LTS version (recommended)" -ForegroundColor White
    Write-Host "3. Run the installer and follow the setup wizard" -ForegroundColor White
    Write-Host "4. Make sure to check 'Add to PATH' during installation" -ForegroundColor White
    Write-Host "5. Restart your terminal after installation" -ForegroundColor White
    Write-Host ""
    Write-Host "After installing Node.js, run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to continue..."
    exit
}

# Check if npm is available
Write-Host "Checking for npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✅ npm is available: $npmVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ npm is not available" -ForegroundColor Red
    Write-Host "Please reinstall Node.js with npm included" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Yellow

# Navigate to frontend directory
Set-Location "src\frontend"

# Install dependencies
Write-Host "Running: npm install --legacy-peer-deps" -ForegroundColor Cyan
npm install --legacy-peer-deps

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    Write-Host "Try running: npm cache clean --force" -ForegroundColor Yellow
    Write-Host "Then run this script again" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "=================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "The website will be available at: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to start the development server now..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host "Starting development server..." -ForegroundColor Green
npm run dev

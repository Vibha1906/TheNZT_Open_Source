# 🚀 TheNZT Setup Guide

This guide will help you download and install all required files to run TheNZT locally.

## 📋 Prerequisites

Before starting, you need to install the following:

### 1. Node.js (Required)
- **Download**: https://nodejs.org/
- **Version**: LTS (Long Term Support) - Recommended
- **Why**: Required to run the Next.js frontend

### 2. Python 3.11+ (For Backend)
- **Download**: https://www.python.org/downloads/
- **Version**: 3.11 or higher
- **Why**: Required to run the FastAPI backend

### 3. Git (Optional but Recommended)
- **Download**: https://git-scm.com/downloads
- **Why**: For version control and cloning repositories

## 🛠️ Quick Setup (Automated)

### Option 1: Run Setup Script
1. **Double-click** `setup-theNZT.bat` in the project root
2. **Follow the prompts** - the script will guide you through everything
3. **Wait for installation** to complete (may take 5-10 minutes)

### Option 2: Manual Setup
Follow the steps below if you prefer manual installation.

## 📥 Manual Setup Steps

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Click **"Download Node.js (LTS)"**
3. Run the downloaded installer
4. **Important**: Check "Add to PATH" during installation
5. Restart your terminal/command prompt

### Step 2: Verify Installation
Open a new terminal and run:
```bash
node --version
npm --version
```
You should see version numbers for both commands.

### Step 3: Install Frontend Dependencies
```bash
cd src/frontend
npm install --legacy-peer-deps
```

### Step 4: Install Backend Dependencies
```bash
# Go back to project root
cd ../..
# Install Python dependencies
pip install -r requirements.txt
```

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
uvicorn src.backend.app:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd src/frontend
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🔧 Troubleshooting

### Common Issues:

#### "node is not recognized"
- **Solution**: Restart your terminal after installing Node.js
- **Alternative**: Add Node.js to your system PATH manually

#### "npm is not recognized"
- **Solution**: Reinstall Node.js and make sure npm is included

#### Port already in use
- **Solution**: Kill the process using the port:
  ```bash
  # For port 3000 (frontend)
  netstat -ano | findstr :3000
  taskkill /PID <PID_NUMBER> /F
  
  # For port 8000 (backend)
  netstat -ano | findstr :8000
  taskkill /PID <PID_NUMBER> /F
  ```

#### Dependencies installation fails
- **Solution**: Clear npm cache and try again:
  ```bash
  npm cache clean --force
  npm install --legacy-peer-deps
  ```

#### Python dependencies fail
- **Solution**: Use a virtual environment:
  ```bash
  python -m venv venv
  venv\Scripts\activate
  pip install -r requirements.txt
  ```

## 📁 Project Structure

```
TheNZT_Open_Source/
├── src/
│   ├── frontend/          # Next.js React application
│   │   ├── src/
│   │   │   ├── app/       # Pages and layouts
│   │   │   ├── components/ # React components
│   │   │   └── ...
│   │   ├── package.json   # Frontend dependencies
│   │   └── ...
│   ├── backend/           # FastAPI Python application
│   │   ├── api/           # API endpoints
│   │   ├── models/        # Data models
│   │   └── ...
│   └── ai/                # AI agents and tools
├── requirements.txt       # Python dependencies
├── setup-theNZT.bat      # Windows setup script
├── setup-theNZT.ps1      # PowerShell setup script
└── SETUP-GUIDE.md        # This file
```

## 🎯 What You'll See

Once everything is running, you'll have access to:

1. **Landing Page** - Professional homepage showcasing TheNZT
2. **Documentation** - Complete system documentation
3. **Interactive Demo** - Live demonstration of the AI agents
4. **API Documentation** - Complete API reference
5. **Contributing Guide** - How to contribute to the project

## 🆘 Need Help?

If you encounter any issues:

1. **Check this guide** for common solutions
2. **Run the setup script** again
3. **Check the GitHub issues** for similar problems
4. **Create a new issue** if the problem persists

## 🎉 Success!

Once you see the TheNZT website running at http://localhost:3000, you're all set! 

The website includes:
- ✅ Responsive design (works on mobile, tablet, desktop)
- ✅ Interactive demo with AI agent visualization
- ✅ Complete documentation
- ✅ API reference with code examples
- ✅ Contributing guidelines

Enjoy exploring TheNZT! 🚀

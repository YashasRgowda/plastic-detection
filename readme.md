# 🌿 AI-Powered Plastic Waste Detection System

An end-to-end machine learning application that uses YOLOv8 to detect and classify 6 types of plastic waste through camera capture, providing real-time analysis and recycling information.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.9+-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🎥 **Real-time Camera Capture** - Access device camera with visual guide frame
- 🤖 **AI-Powered Detection** - YOLOv8-based plastic classification
- 🎯 **6 Plastic Types** - Detects PETE, HDPE, PVC, LDPE, PP, PS
- 📊 **Confidence Scores** - Shows detection confidence with progress bars
- 🖼️ **Bounding Boxes** - Visual overlay showing detected regions
- ♻️ **Recycling Information** - Educational content for each plastic type
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🎨 **Smart Image Processing** - Center cropping for better accuracy
- ⚡ **Fast API** - RESTful backend with automatic docs

---

## 🎬 Demo

### Home Screen
Clean landing page with backend status indicator and "How It Works" guide.

### Camera View
Full-screen camera with animated guide frame to help users position plastic items correctly.

### Results Display
Detection results with bounding boxes, plastic type badges, confidence meters, and recycling tips.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.115.0
- **ML Model**: YOLOv8 (Ultralytics)
- **Deep Learning**: PyTorch, TorchVision
- **Image Processing**: Pillow, OpenCV
- **Server**: Uvicorn (ASGI)

### Frontend
- **Framework**: Next.js 15.1.6 (React 19)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Camera**: React Webcam
- **HTTP Client**: Axios

---

## 🏗️ System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Camera     │→ │Image Preview │→ │   Results    │      │
│  │   Capture    │  │  + Crop      │  │   Display    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                                │
│         └──────────────────┴─── HTTP POST (image) ──────────┤
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   /predict   │→ │   YOLOv8     │→ │   JSON       │      │
│  │   endpoint   │  │   Model      │  │   Response   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Prerequisites

### Required Software

| Software | Minimum Version | Purpose |
|----------|----------------|---------|
| Python | 3.9+ | Backend runtime |
| Node.js | 18+ | Frontend runtime |
| npm | 9+ | Package manager |
| Git | 2.0+ | Version control |

### Hardware Requirements

- **RAM**: 8GB minimum (16GB recommended for model training)
- **Storage**: 5GB free space
- **Camera**: Built-in or external webcam
- **GPU**: Optional (CPU works, GPU accelerates inference)

### System Compatibility

- ✅ macOS (Intel & Apple Silicon)
- ✅ Linux (Ubuntu 20.04+, Debian, etc.)
- ✅ Windows 10/11 (with WSL2 recommended)

---

## 🚀 Installation

### Quick Start (5 minutes)
```bash
# Clone the repository
git clone https://github.com/yourusername/plastic-detection.git
cd plastic-detection

# Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python download_model.py

# Setup frontend (in new terminal)
cd ../client
npm install

# Start backend (terminal 1)
cd backend
source venv/bin/activate
python app/main.py

# Start frontend (terminal 2)
cd client
npm run dev
```

Open http://localhost:3000 🎉

---

## 1️⃣ Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Create Virtual Environment

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate
```

**Windows (PowerShell):**
```powershell
python -m venv venv
venv\Scripts\Activate.ps1
```

You should see `(venv)` in your terminal prompt.

### Step 3: Upgrade pip
```bash
pip install --upgrade pip
```

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

**Note**: This may take 5-10 minutes as it downloads PyTorch and other ML libraries.

### Step 5: Download YOLOv8 Model

**Option A: Automatic Download (Recommended)**
```bash
python download_model.py
```

**Option B: Manual Download**

If the script fails, download manually:

1. Download the trained model from your source
2. Create `models` folder: `mkdir models`
3. Place `best.pt` file in `models/` directory

**Option C: Use Pretrained YOLOv8**

For testing without custom model:
```python
# Edit app/main.py - change MODEL_PATH to:
MODEL_PATH = "yolov8n.pt"  # This will auto-download a pretrained model
```

### Step 6: Create Environment Variables (Optional)

Create `.env` file in `backend/` folder:
```bash
touch .env
```

Add this content:
```env
MODEL_PATH=models/best.pt
CONFIDENCE_THRESHOLD=0.25
IMAGE_SIZE=640
PORT=8000
```

### Step 7: Verify Installation
```bash
python app/main.py
```

Expected output:
```
🚀 Starting Plastic Waste Detection API...
📦 Loading model from: models/best.pt
✅ Model loaded successfully!
📊 Classes: ['HDPE', 'LDPE', 'PETE', 'PP', 'PS', 'PVC']

INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Step 8: Test API

Open browser and go to:
- **Swagger UI**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## 2️⃣ Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd client
```

### Step 2: Install Dependencies
```bash
npm install
```

**Troubleshooting npm install errors:**

If you get errors, try:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Step 3: Configure Backend URL (Optional)

If your backend runs on a different port or domain, edit `src/lib/api.js`:
```javascript
// Change this line:
const API_URL = 'http://localhost:8000';

// To your backend URL:
const API_URL = 'https://your-backend-url.com';
```

### Step 4: Start Development Server
```bash
npm run dev
```

Expected output:
```
  ▲ Next.js 15.1.6
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Starting...
 ✓ Ready in 2.1s
```

### Step 5: Access Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/docs

---

## 🎯 Usage

### Basic Workflow

1. **Start Backend Server** (Terminal 1)
```bash
   cd backend
   source venv/bin/activate
   python app/main.py
```

2. **Start Frontend** (Terminal 2)
```bash
   cd client
   npm run dev
```

3. **Use Application**
   - Open http://localhost:3000
   - Click "Start Camera"
   - Allow camera permissions
   - Position plastic item in green guide frame
   - Click capture button (white circle)
   - Preview image, enable "Smart Crop" (optional)
   - Click "Analyze Plastic"
   - View results with bounding boxes and recycling info

### Testing with Sample Images

1. Place test images in `backend/test_images/`
2. Use Swagger UI at http://localhost:8000/docs
3. Go to `/predict` endpoint
4. Click "Try it out"
5. Upload test image
6. Click "Execute"

---

## 📚 API Documentation

### Endpoints

#### `GET /`
Health check endpoint.

**Response:**
```json
{
  "message": "Plastic Waste Detection API is running!",
  "endpoints": {
    "predict": "/predict (POST - upload image)",
    "health": "/health (GET)",
    "docs": "/docs (GET - Swagger UI)"
  }
}
```

#### `GET /health`
Check API and model status.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "models/best.pt"
}
```

#### `POST /predict`
Detect plastic in uploaded image.

**Request:**
- **Content-Type**: `multipart/form-data`
- **Body**: `file` (image file - JPG, PNG, etc.)

**Response:**
```json
{
  "success": true,
  "message": "Found 2 plastic item(s)",
  "detections": [
    {
      "class_name": "PETE",
      "class_id": 2,
      "confidence": 0.92,
      "bounding_box": {
        "x1": 150.5,
        "y1": 200.3,
        "x2": 350.8,
        "y2": 450.2,
        "width": 200.3,
        "height": 249.9
      }
    }
  ],
  "image_size": {
    "width": 1280,
    "height": 720
  }
}
```

### Plastic Type Classes

| Class ID | Code | Full Name | Recyclable |
|----------|------|-----------|------------|
| 0 | HDPE | High-Density Polyethylene | ✅ Yes |
| 1 | LDPE | Low-Density Polyethylene | ✅ Yes |
| 2 | PETE | Polyethylene Terephthalate | ✅ Yes |
| 3 | PP | Polypropylene | ✅ Yes |
| 4 | PS | Polystyrene | ❌ No |
| 5 | PVC | Polyvinyl Chloride | ❌ No |

---

## 📁 Project Structure
```
plastic-detection/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   └── main.py            # Main API application
│   ├── models/
│   │   └── best.pt            # Trained YOLOv8 model
│   ├── test_images/           # Sample images for testing
│   ├── requirements.txt       # Python dependencies
│   ├── download_model.py      # Model download script
│   ├── .env                   # Environment variables (create this)
│   ├── .gitignore
│   └── readme.md
│
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js        # Main app page
│   │   │   ├── layout.js      # Root layout
│   │   │   └── globals.css    # Global styles
│   │   ├── components/
│   │   │   ├── Camera.jsx     # Camera capture component
│   │   │   ├── ImagePreview.jsx  # Image preview & crop
│   │   │   ├── Loading.jsx    # Loading animation
│   │   │   ├── Results.jsx    # Results display
│   │   │   └── ui/            # Shadcn UI components
│   │   └── lib/
│   │       ├── api.js         # Backend API calls
│   │       ├── imageProcessing.js  # Image utilities
│   │       └── utils.js       # General utilities
│   ├── public/                # Static assets
│   ├── package.json           # Node dependencies
│   ├── next.config.mjs        # Next.js config
│   ├── tailwind.config.js     # Tailwind config
│   └── components.json        # Shadcn config
│
└── README.md                  # This file
```

---

## 🚢 Deployment

### Backend Deployment

#### Option 1: Render (Free Tier)

1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: plastic-detection-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

2. Push to GitHub
3. Connect to Render
4. Deploy

#### Option 2: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Option 3: Docker
```dockerfile
# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```
```bash
docker build -t plastic-detection-backend .
docker run -p 8000:8000 plastic-detection-backend
```

### Frontend Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel
```

#### Netlify
```bash
# Build
npm run build

# Deploy build folder
netlify deploy --prod --dir=.next
```

---

## 🐛 Troubleshooting

### Backend Issues

#### "Model not found" Error

**Problem**: `best.pt` file missing

**Solution**:
```bash
cd backend
python download_model.py
# OR manually place model in models/ folder
```

#### "Module not found" Error

**Problem**: Dependencies not installed or wrong Python version

**Solution**:
```bash
# Deactivate and recreate venv
deactivate
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Port Already in Use

**Problem**: Port 8000 is occupied

**Solution**:
```bash
# Find and kill process on port 8000 (macOS/Linux)
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# OR change port in .env
PORT=8001
```

#### PyTorch Installation Issues

**Problem**: PyTorch install fails or takes forever

**Solution** (Install CPU-only version):
```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install ultralytics
```

### Frontend Issues

#### "Backend Not Connected" Message

**Problem**: Backend not running or wrong URL

**Solution**:
1. Check backend is running: http://localhost:8000/health
2. Verify `API_URL` in `src/lib/api.js`
3. Check CORS settings in backend

#### Camera Not Working

**Problem**: Browser blocks camera access

**Solution**:
1. Use HTTPS in production (HTTP only works on localhost)
2. Check browser permissions
3. Try different browser (Chrome/Firefox recommended)

#### npm install Fails

**Problem**: Package conflicts or network issues

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

#### Build Errors

**Problem**: Next.js build fails

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Common Runtime Issues

#### Low Detection Accuracy

**Solutions**:
- Ensure good lighting
- Position plastic item to fill guide frame
- Enable "Smart Crop" option
- Keep background simple
- Hold camera steady

#### Slow Performance

**Solutions**:
- Reduce image size in camera settings
- Use GPU if available
- Deploy backend on faster server
- Optimize image before sending

---

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:
```env
# Model Configuration
MODEL_PATH=models/best.pt
CONFIDENCE_THRESHOLD=0.25
IMAGE_SIZE=640

# Server Configuration
PORT=8000
HOST=0.0.0.0

# CORS (for production)
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend Environment Variables

Create `client/.env.local`:
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Feature Flags
NEXT_PUBLIC_ENABLE_BACKGROUND_REMOVAL=false
```

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd client
npm test
```

### Manual Testing Checklist

- [ ] Backend health endpoint responds
- [ ] Swagger UI loads and works
- [ ] Frontend loads without errors
- [ ] Camera access works
- [ ] Image capture works
- [ ] Preview shows captured image
- [ ] Smart crop toggle works
- [ ] API call succeeds
- [ ] Results display correctly
- [ ] Bounding boxes render properly
- [ ] Confidence scores show
- [ ] Recycling info displays
- [ ] "Scan Again" resets app

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint config for JavaScript
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- YOLOv8 by Ultralytics
- FastAPI framework
- Next.js and Vercel team
- Shadcn UI components
- Open source community

---

## 📞 Support

For issues and questions:
- 🐛 [Open an issue](https://github.com/yourusername/plastic-detection/issues)
- 📧 Email: your.email@example.com
- 💬 Discord: [Join our server](https://discord.gg/yourserver)

---

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Offline mode with service workers
- [ ] History of scanned items
- [ ] Export results as PDF
- [ ] Mobile app (React Native)
- [ ] Real-time video detection
- [ ] Batch image processing
- [ ] Integration with recycling centers API

---

**Made with ❤️ for a cleaner planet 🌍**
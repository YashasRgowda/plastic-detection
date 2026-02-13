# 🌿 Plastic Waste Detection Backend

Simple FastAPI backend for YOLOv8 plastic waste detection.

## 🎯 What This Does

This backend API:
- ✅ Accepts images (from frontend or Postman)
- ✅ Runs your trained YOLOv8 model
- ✅ Returns plastic type + bounding boxes + confidence

## 📁 Project Structure

```
plastic-detection-backend/
├── app/
│   └── main.py          # Main FastAPI application
├── models/
│   └── best.pt          # Your trained model (download this)
├── test_images/         # Put test images here
├── requirements.txt     # Python packages
├── .env                 # Configuration
└── download_model.py    # Script to download model
```

## 🚀 Setup Instructions

### 1. Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Packages
```bash
pip install -r requirements.txt
```

### 3. Download Model
```bash
python download_model.py
```

### 4. Start Server
```bash
python app/main.py
```

### 5. Open Browser
Go to: http://localhost:8000/docs

## 🧪 Test the API

### Using Swagger UI (Easiest)
1. Go to http://localhost:8000/docs
2. Click `/predict`
3. Click "Try it out"
4. Upload an image
5. Click "Execute"

### Using Python
```python
import requests

url = "http://localhost:8000/predict"
files = {"file": open("test_image.jpg", "rb")}
response = requests.post(url, files=files)
print(response.json())
```

### Using cURL
```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@test_image.jpg"
```

## 📊 Response Format

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

## 🔧 Configuration

Edit `.env` to change settings:
- `MODEL_PATH` - Path to your model file
- `CONFIDENCE_THRESHOLD` - Minimum confidence (0.25 = 25%)
- `IMAGE_SIZE` - Input image size (640)
- `PORT` - Server port (8000)

## 📱 Plastic Types Detected

1. HDPE - High-Density Polyethylene
2. LDPE - Low-Density Polyethylene
3. PETE - Polyethylene Terephthalate
4. PP - Polypropylene
5. PS - Polystyrene
6. PVC - Polyvinyl Chloride

## 🐛 Troubleshooting

**Model not loading?**
```bash
ls models/best.pt  # Check if file exists
python download_model.py  # Re-download
```

**Port already in use?**
```bash
# Change PORT in .env file to 8001
```

**Import errors?**
```bash
pip install -r requirements.txt
```

## 🎯 Next Steps

After backend is working:
1. Build frontend (React/Next.js)
2. Add camera access
3. Display detections visually
4. Deploy to cloud

---

**Questions?** Check the code comments in `app/main.py` - everything is explained!
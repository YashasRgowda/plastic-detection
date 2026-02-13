"""
Plastic Waste Detection API - Main Application

This is the core file that:
1. Creates the FastAPI server
2. Loads the YOLOv8 model
3. Provides the /predict endpoint to detect plastic waste
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import os
from ultralytics import YOLO

# ============================================================================
# GLOBAL VARIABLES
# ============================================================================

# This will store our loaded YOLOv8 model
model = None

# Your 6 plastic types (from your data.yaml)
CLASS_NAMES = ['HDPE', 'LDPE', 'PETE', 'PP', 'PS', 'PVC']

# Settings from .env file
MODEL_PATH = os.getenv("MODEL_PATH", "models/best.pt")
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.25"))
IMAGE_SIZE = int(os.getenv("IMAGE_SIZE", "640"))


# ============================================================================
# CREATE FASTAPI APP
# ============================================================================

app = FastAPI(
    title="Plastic Waste Detection API",
    description="Detect and classify plastic waste using YOLOv8",
    version="1.0.0"
)

# Add CORS - This allows frontend (React/Next.js) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# STARTUP EVENT - Load Model When Server Starts
# ============================================================================

@app.on_event("startup")
async def load_model():
    """
    This function runs when the server starts.
    It loads your YOLOv8 model into memory.
    """
    global model
    
    print("🚀 Starting Plastic Waste Detection API...")
    print(f"📦 Loading model from: {MODEL_PATH}")
    
    # Check if model file exists
    if not os.path.exists(MODEL_PATH):
        print(f"❌ ERROR: Model file not found at {MODEL_PATH}")
        print("Please run: python download_model.py")
        return
    
    try:
        # Load the YOLOv8 model
        model = YOLO(MODEL_PATH)
        print("✅ Model loaded successfully!")
        print(f"📊 Classes: {CLASS_NAMES}")
        
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")


# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """
    Root endpoint - Just a welcome message
    """
    return {
        "message": "Plastic Waste Detection API is running!",
        "endpoints": {
            "predict": "/predict (POST - upload image)",
            "health": "/health (GET)",
            "docs": "/docs (GET - Swagger UI)"
        }
    }


@app.get("/health")
async def health_check():
    """
    Health check - Verify API and model are ready
    """
    model_loaded = model is not None
    
    return {
        "status": "healthy" if model_loaded else "model not loaded",
        "model_loaded": model_loaded,
        "model_path": MODEL_PATH
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    MAIN PREDICTION ENDPOINT
    
    This is the most important endpoint!
    
    How it works:
    1. Frontend sends an image file
    2. We read the image
    3. Run YOLOv8 detection
    4. Return bounding boxes + plastic types + confidence scores
    
    Input: Image file (JPG, PNG, etc.)
    Output: JSON with detections
    """
    
    # Check if model is loaded
    if model is None:
        raise HTTPException(
            status_code=500,
            detail="Model not loaded. Check server logs."
        )
    
    # Validate that file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File must be an image"
        )
    
    try:
        # Step 1: Read the uploaded image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if needed (handles PNG with alpha channel, etc.)
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # Step 2: Run YOLOv8 prediction
        results = model.predict(
            source=image,
            conf=CONFIDENCE_THRESHOLD,  # Only show detections above 25% confidence
            imgsz=IMAGE_SIZE,            # Image size 640x640
            verbose=False                # Don't print logs
        )
        
        # Step 3: Parse the results
        detections = []
        
        # Get the first result (we only sent one image)
        result = results[0]
        
        # Extract bounding boxes, classes, and confidence scores
        boxes = result.boxes.xyxy.cpu().numpy()      # [x1, y1, x2, y2] coordinates
        classes = result.boxes.cls.cpu().numpy()     # Class IDs (0-5)
        confidences = result.boxes.conf.cpu().numpy() # Confidence scores
        
        # Create detection objects
        for box, cls_id, conf in zip(boxes, classes, confidences):
            x1, y1, x2, y2 = box
            cls_id = int(cls_id)
            
            detection = {
                "class_name": CLASS_NAMES[cls_id],  # "PETE", "HDPE", etc.
                "class_id": cls_id,
                "confidence": float(conf),
                "bounding_box": {
                    "x1": float(x1),
                    "y1": float(y1),
                    "x2": float(x2),
                    "y2": float(y2),
                    "width": float(x2 - x1),
                    "height": float(y2 - y1)
                }
            }
            
            detections.append(detection)
        
        # Step 4: Return results
        return {
            "success": True,
            "message": f"Found {len(detections)} plastic item(s)",
            "detections": detections,
            "image_size": {
                "width": image.width,
                "height": image.height
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )


# ============================================================================
# RUN THE SERVER (when you run: python main.py)
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", "8000"))
    
    print(f"\n{'='*60}")
    print("🚀 Starting server...")
    print(f"📍 URL: http://localhost:{port}")
    print(f"📖 Docs: http://localhost:{port}/docs")
    print(f"{'='*60}\n")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True  # Auto-reload on code changes
    )
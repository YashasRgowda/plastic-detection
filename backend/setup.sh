#!/bin/bash

# Simple setup script for Plastic Detection Backend

echo ""
echo "=========================================="
echo "  Plastic Detection Backend Setup"
echo "=========================================="
echo ""

# Step 1: Check Python version
echo "1️⃣  Checking Python version..."
python3 --version
echo ""

# Step 2: Create virtual environment
echo "2️⃣  Creating virtual environment..."
python3 -m venv venv
echo "✅ Virtual environment created!"
echo ""

# Step 3: Activate virtual environment
echo "3️⃣  Activating virtual environment..."
source venv/bin/activate
echo "✅ Virtual environment activated!"
echo ""

# Step 4: Upgrade pip
echo "4️⃣  Upgrading pip..."
pip install --upgrade pip
echo ""

# Step 5: Install requirements
echo "5️⃣  Installing requirements (this may take 5-10 minutes)..."
pip install -r requirements.txt
echo "✅ Requirements installed!"
echo ""

# Step 6: Download model
echo "6️⃣  Downloading YOLOv8 model..."
python download_model.py
echo ""

# Done
echo "=========================================="
echo "  ✅ Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Activate venv: source venv/bin/activate"
echo "  2. Start server: python app/main.py"
echo "  3. Open browser: http://localhost:8000/docs"
echo ""
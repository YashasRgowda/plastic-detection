'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera as CameraIcon, Leaf, AlertCircle } from 'lucide-react';
import Camera from '@/components/Camera';
import ImagePreview from '@/components/ImagePreview';
import Loading from '@/components/Loading';
import Results from '@/components/Results';
import { cropCenterRegion, dataURLtoBlob } from '@/lib/imageProcessing';
import { detectPlastic, checkBackendHealth } from '@/lib/api';

export default function Home() {
  // State management
  const [currentScreen, setCurrentScreen] = useState('home'); // home, camera, preview, loading, results
  const [capturedImage, setCapturedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [backendStatus, setBackendStatus] = useState(null);

  // Check backend health on mount
  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    const health = await checkBackendHealth();
    setBackendStatus(health);
  };

  // Handle camera capture
  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    setCurrentScreen('preview');
  };

  // Handle retake
  const handleRetake = () => {
    setCapturedImage(null);
    setCurrentScreen('camera');
  };

  // Handle analyze
  const handleAnalyze = async (shouldCrop) => {
    setCurrentScreen('loading');
    
    try {
      let imageToSend = capturedImage;
      
      // Apply smart crop if enabled
      if (shouldCrop) {
        imageToSend = await cropCenterRegion(capturedImage, 70);
      }
      
      setProcessedImage(imageToSend);
      
      // Convert to blob
      const blob = dataURLtoBlob(imageToSend);
      
      // Send to backend
      const result = await detectPlastic(blob);
      
      if (result.success && result.detections.length > 0) {
        setDetections(result.detections);
        setCurrentScreen('results');
      } else {
        alert('No plastic detected. Please try again with better lighting.');
        setCurrentScreen('preview');
      }
      
    } catch (error) {
      console.error('Error analyzing:', error);
      alert('Error analyzing image. Make sure your backend is running!');
      setCurrentScreen('preview');
    }
  };

  // Handle scan again
  const handleScanAgain = () => {
    setCapturedImage(null);
    setProcessedImage(null);
    setDetections([]);
    setCurrentScreen('home');
  };

  // Render different screens based on state
  if (currentScreen === 'camera') {
    return (
      <Camera
        onCapture={handleCapture}
        onClose={() => setCurrentScreen('home')}
      />
    );
  }

  if (currentScreen === 'preview') {
    return (
      <ImagePreview
        image={capturedImage}
        onRetake={handleRetake}
        onAnalyze={handleAnalyze}
      />
    );
  }

  if (currentScreen === 'loading') {
    return <Loading />;
  }

  if (currentScreen === 'results') {
    return (
      <Results
        image={processedImage}
        detections={detections}
        onScanAgain={handleScanAgain}
      />
    );
  }

  // Home Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 p-4 rounded-full">
                <Leaf className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Plastic Detector
            </h1>
            <p className="text-lg text-gray-600">
              AI-Powered Waste Classification
            </p>
          </div>

          {/* Backend Status Card */}
          {backendStatus ? (
            <Card className="p-4 mb-8 bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="font-semibold text-green-900">Backend Connected</p>
                  <p className="text-sm text-green-700">
                    Model: {backendStatus.model_loaded ? 'Loaded ✓' : 'Not Loaded'}
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-4 mb-8 bg-red-50 border-red-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">Backend Not Connected</p>
                  <p className="text-sm text-red-700">
                    Make sure your backend is running on port 8000
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Main Card */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Position Plastic</h3>
                  <p className="text-gray-600 text-sm">
                    Place plastic item in the center guide frame
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Capture Photo</h3>
                  <p className="text-gray-600 text-sm">
                    Take a clear picture with good lighting
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Results</h3>
                  <p className="text-gray-600 text-sm">
                    AI instantly identifies plastic type and recyclability
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Start Button */}
          <Button
            onClick={() => setCurrentScreen('camera')}
            disabled={!backendStatus}
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white h-16 text-lg"
          >
            <CameraIcon className="mr-3 h-6 w-6" />
            Start Camera
          </Button>

          {/* Plastic Types Info */}
          <Card className="p-6 mt-8">
            <h3 className="font-bold mb-4">Detectable Plastic Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['PETE', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS'].map((type) => (
                <div
                  key={type}
                  className="bg-gray-50 p-3 rounded-lg text-center text-sm font-medium"
                >
                  {type}
                </div>
              ))}
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>🌿 Help the environment, one plastic at a time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
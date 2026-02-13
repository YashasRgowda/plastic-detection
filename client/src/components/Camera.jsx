'use client';

import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Camera({ onCapture, onClose }) {
  const webcamRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
        <h2 className="text-white text-lg font-semibold">
          Position Plastic in Frame
        </h2>
        <div className="w-10" />
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: 'environment',
            width: 1920,
            height: 1080,
          }}
          onUserMedia={() => setIsCameraReady(true)}
          className="w-full h-full object-cover"
        />

        {/* Guide Frame Overlay */}
        {isCameraReady && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative z-10 w-[70%] h-[50%] border-4 border-green-500 border-dashed rounded-lg animate-pulse">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg" />
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-white text-center text-sm bg-black/50 px-4 py-2 rounded-full">
                  Center the plastic here
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Capture Button */}
      {isCameraReady && (
        <div className="absolute bottom-0 left-0 right-0 pb-8 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
          <Button
            onClick={capturePhoto}
            size="lg"
            className="w-20 h-20 rounded-full bg-white hover:bg-gray-200 shadow-lg"
          >
            <CameraIcon className="h-10 w-10 text-gray-800" />
          </Button>
        </div>
      )}

      {/* Loading state */}
      {!isCameraReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4" />
            <p className="text-white">Starting camera...</p>
          </div>
        </div>
      )}
    </div>
  );
}
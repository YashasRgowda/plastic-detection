'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function ImagePreview({ image, onRetake, onAnalyze }) {
  const [smartCrop, setSmartCrop] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onRetake}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retake
          </Button>
          <h2 className="text-xl font-bold">Preview</h2>
          <div className="w-20" />
        </div>

        {/* Image Preview */}
        <Card className="overflow-hidden mb-6">
          <div className="relative aspect-video bg-gray-100">
            <img
              src={image}
              alt="Captured"
              className="w-full h-full object-contain"
            />
          </div>
        </Card>

        {/* Processing Options */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Processing Options</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Smart Crop</p>
                <p className="text-sm text-gray-500">
                  Focus on center, remove edges
                </p>
              </div>
              <input
                type="checkbox"
                checked={smartCrop}
                onChange={(e) => setSmartCrop(e.target.checked)}
                className="w-6 h-6 accent-green-600 cursor-pointer"
              />
            </div>
          </div>
        </Card>

        {/* Analyze Button */}
        <Button
          onClick={() => onAnalyze(smartCrop)}
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Analyze Plastic
        </Button>
      </div>
    </div>
  );
}
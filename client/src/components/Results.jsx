'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Recycle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const PLASTIC_INFO = {
  HDPE: {
    name: 'High-Density Polyethylene',
    color: 'bg-blue-500',
    recyclable: true,
    uses: 'Milk jugs, detergent bottles',
  },
  LDPE: {
    name: 'Low-Density Polyethylene',
    color: 'bg-purple-500',
    recyclable: true,
    uses: 'Shopping bags, squeeze bottles',
  },
  PETE: {
    name: 'Polyethylene Terephthalate',
    color: 'bg-green-500',
    recyclable: true,
    uses: 'Water bottles, food containers',
  },
  PP: {
    name: 'Polypropylene',
    color: 'bg-yellow-500',
    recyclable: true,
    uses: 'Yogurt containers, bottle caps',
  },
  PS: {
    name: 'Polystyrene',
    color: 'bg-red-500',
    recyclable: false,
    uses: 'Disposable cups, packaging',
  },
  PVC: {
    name: 'Polyvinyl Chloride',
    color: 'bg-orange-500',
    recyclable: false,
    uses: 'Pipes, credit cards',
  },
};

export default function Results({ image, detections, onScanAgain }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !detections.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      detections.forEach((det) => {
        const { x1, y1, x2, y2 } = det.bounding_box;

        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 4;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

        ctx.fillStyle = '#10B981';
        const text = `${det.class_name} ${Math.round(det.confidence * 100)}%`;
        const textWidth = ctx.measureText(text).width;
        ctx.fillRect(x1, y1 - 35, textWidth + 20, 35);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(text, x1 + 10, y1 - 10);
      });
    };

    img.src = image;
  }, [image, detections]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onScanAgain}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h2 className="text-xl font-bold">Detection Results</h2>
          <div className="w-20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">
                  Detection Complete!
                </p>
                <p className="text-sm text-green-700">
                  Found {detections.length} plastic item(s)
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <Card className="overflow-hidden mb-6">
          <canvas ref={canvasRef} className="w-full h-auto" />
        </Card>

        <div className="space-y-4 mb-6">
          {detections.map((det, index) => {
            const info = PLASTIC_INFO[det.class_name];
            const confidence = Math.round(det.confidence * 100);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${info.color} text-white`}>
                          {det.class_name}
                        </Badge>
                        {info.recyclable && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Recycle className="h-3 w-3 mr-1" />
                            Recyclable
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold">{info.name}</h3>
                      <p className="text-sm text-gray-600">{info.uses}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Confidence</span>
                      <span className="text-gray-600">{confidence}%</span>
                    </div>
                    <Progress value={confidence} className="h-2" />
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium mb-1">💡 Recycling Tip</p>
                    <p className="text-sm text-gray-600">
                      {info.recyclable
                        ? `${det.class_name} is widely recyclable. Rinse before recycling.`
                        : `${det.class_name} is difficult to recycle. Check local facilities.`}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Button
          onClick={onScanAgain}
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Scan Another Plastic
        </Button>
      </div>
    </div>
  );
}
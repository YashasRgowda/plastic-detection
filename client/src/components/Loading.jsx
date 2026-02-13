'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-6"
        >
          <Loader2 className="h-16 w-16 text-green-600" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Analyzing Plastic...
        </h2>
        <p className="text-gray-600">
          AI is detecting plastic type
        </p>
        
        <div className="mt-6 w-64 mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-600"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// Smart crop - focuses on center 70% of image
export function cropCenterRegion(imageDataUrl, cropPercentage = 70) {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate crop dimensions
      const cropWidth = img.width * (cropPercentage / 100);
      const cropHeight = img.height * (cropPercentage / 100);
      
      // Center coordinates
      const startX = (img.width - cropWidth) / 2;
      const startY = (img.height - cropHeight) / 2;
      
      // Set canvas size to cropped size
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      
      // Draw cropped portion
      ctx.drawImage(
        img,
        startX, startY, cropWidth, cropHeight,  // Source rectangle
        0, 0, cropWidth, cropHeight              // Destination rectangle
      );
      
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    
    img.src = imageDataUrl;
  });
}

// Convert data URL to Blob for sending to backend
export function dataURLtoBlob(dataURL) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}
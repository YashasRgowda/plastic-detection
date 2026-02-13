import axios from 'axios';

// Backend URL - change this if your backend runs on different port
const API_URL = 'http://localhost:8000';

// Send image to backend for prediction
export async function detectPlastic(imageBlob) {
  const formData = new FormData();
  formData.append('file', imageBlob, 'plastic.jpg');
  
  try {
    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error detecting plastic:', error);
    throw error;
  }
}

// Check if backend is running
export async function checkBackendHealth() {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return null;
  }
}
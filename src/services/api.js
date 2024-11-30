import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/api'; // Backend base URL

// Fetch all stocks
export const fetchStocks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stocks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return [];
  }
};
